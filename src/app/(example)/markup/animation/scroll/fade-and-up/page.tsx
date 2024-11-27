'use client';

import styles from './page.module.scss';
import {useShowOnViewport} from '@/utils/extend/browser/intersection-observer';

/**
 * URL: http://localhost:3000/markup/animation/scroll/fade-and-up
 *
 * 스펙 1. 스크롤 내리면 그 때 박스들이 아래에서 위로 올라오면서 fade-in 처리됨.
 * 스펙 2. 다시 스크롤 올리면 아까 봤던 박스들은 그대로 있음.
 */
export default function Page() {
  useShowOnViewport({
    elementsSelector: `.${styles.box}`,
    callback: 'animation'
  });

  return (
    <div className={styles.page}>
      <section><div className={styles.box} /></section>
      <section><div className={styles.box} /></section>
      <section><div className={styles.box} /></section>
      <section><div className={styles.box} /></section>
      <section><div className={styles.box} /></section>
      <section><div className={styles.box} /></section>
      <section><div className={styles.box} /></section>
    </div>
  );
}
