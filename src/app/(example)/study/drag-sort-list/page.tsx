'use client';

import {useState} from 'react';
import styles from './page.module.scss';
import {useSortListWithDragAndDrop} from '@/utils/extend/useSortListWithDragAndDrop';

// URL: http://localhost:3000/study/drag-sort-list
// Doc: https://docs.google.com/document/d/1WY2nU73zxkzLqcn9NCMA9rhLrKW7049fyJD7nJioYms/edit?tab=t.0
export default function Page() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => ({data: value.toString().repeat(10)})));
  const {onDragStartCallback, onDropCallback, ...rest} = useSortListWithDragAndDrop({
    list: items,
    onChange: {
      all: setItems,
    }
  });

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.item}
          onDragStart={onDragStartCallback(index)}
          onDrop={onDropCallback(index)}
          {...rest}
        >
          {item.data}
        </div>
      ))}
    </div>
  );
}
