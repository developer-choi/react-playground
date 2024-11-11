'use client';

import styles from './page.module.scss';
import {useEffect} from 'react';

/**
 * URL: http://localhost:3000/markup/animation/scroll/text-per-line
 *
 * Reference:
 * https://lattice.com
 * https://youtu.be/kKktI_uMFBw
 *
 * 스크롤 내리면 문장단위로 글자들이 투명도가 또렷해지는 애니메이션
 */
export default function Page() {
  useEffect(() => {
    const words = document.querySelectorAll(`#section > .${styles.line}`);

    // TODO 최적화 가능함 > 스크롤을 해당 섹션 도착했을 때 리스너를 추가해야함.
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const {top} = wordRect;
        const distanceBetweenElementBottomAndWindowBottom = windowHeight - top - 150;

        if (distanceBetweenElementBottomAndWindowBottom < 0) {
          return 0;
        }

        const opacity = (distanceBetweenElementBottomAndWindowBottom / 100) + 0.3;

        (word as HTMLDivElement).style.opacity = opacity.toString();
      });
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page} style={{paddingBlock: 1200}}>
      <section id="section">
        <p className={styles.line}>Lorem Ipsum is simply dummy text of the printing and</p>
        <p className={styles.line}>typesetting industry. Lorem Ipsum has been the</p>
        <p className={styles.line}>industrys standard dummy text ever since the 1500s,</p>
        <p className={styles.line}>when an unknown printer took a galley of type and</p>
        <p className={styles.line}>scrambled it to make a type specimen book. It has</p>
        <p className={styles.line}>survived not only five centuries, but also the leap into</p>
        <p className={styles.line}>electronic typesetting, remaining essentially</p>
        <p className={styles.line}>unchanged. It was popularised in the 1960s with the</p>
        <p className={styles.line}>release of Letraset sheets containing Lorem Ipsum</p>
        <p className={styles.line}>passages, and more recently with desktop publishing</p>
        <p className={styles.line}>software like Aldus PageMaker including versions of</p>
        <p className={styles.line}>Lorem Ipsum.</p>
      </section>
    </div>
  );
}
