'use client';

import styles from './page.module.css';
import {useCallback} from 'react';
import {scrollToElement} from '@forworkchoe/core/utils';

/**
 * URL : http://localhost:3000/solution/scroll-to-element
 * Doc: https://docs.google.com/document/d/1HW8KBo1MeS0ggfdorMDUTG4xaoiDsFjLROljk-2Lvl0/edit?tab=t.0
 */
export default function Home() {
  const onClick1 = useCallback(() => {
    scrollToElement('#target1');
  }, []);

  const onClick2 = useCallback(() => {
    scrollToElement('#target2');
  }, []);

  return (
    <main className={styles.main}>
      <button className={styles.button} onClick={onClick1}>Scroll to target 1</button>
      <button className={styles.button} onClick={onClick2}>Scroll to target 2</button>

      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div id="target1" style={{marginTop: 100}} className={styles.target}>
        TARGET 1
      </div>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div id="target2" className={styles.target}>
        TARGET 2
      </div>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
      <div className={styles.box}/>
    </main>
  );
}
