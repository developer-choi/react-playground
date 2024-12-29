'use client';

import {useCallback, useState, DragEvent} from 'react';
import styles from './page.module.scss';
import {preventDefault} from '@/utils/extend/event';

// URL: http://localhost:3000/study/drag-sort-list
// Blog: https://simian114.gitbook.io/blog/undefined/react/drag-and-drop
export default function Page() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => ({data: value.toString().repeat(10)})));

  const onDragStartCallback = useCallback((index: number) => {
    return (event: DragEvent<HTMLDivElement>) => {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', index.toString());
    };
  }, []);

  const onDropCallback = useCallback((droppedIndex: number) => {
    return (event: DragEvent<HTMLDivElement>) => {
      const droppingIndex = Number(event.dataTransfer.getData('text/plain'));
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      const isDroppedAboveMiddle = event.clientY < rect.top + rect.height / 2;

      setItems(list => {
        const droppingItem = list[droppingIndex];

        return list.reduce((a, b, currentIndex) => {
          if (currentIndex === droppedIndex) {
            if (isDroppedAboveMiddle) {
              return a.concat(droppingItem).concat(b);
            } else {
              return a.concat(b).concat(droppingItem);
            }
          }

          if (currentIndex !== droppingIndex) {
            return a.concat(b);
          }

          return a;
        }, [] as {data: string}[]);
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div key={index} className={styles.item} draggable onDragStart={onDragStartCallback(index)} onDragOver={preventDefault} onDrop={onDropCallback(index)}>{item.data}</div>
      ))}
    </div>
  );
}
