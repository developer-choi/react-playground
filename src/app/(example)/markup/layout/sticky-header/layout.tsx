import {PropsWithChildren} from 'react';
import styles from './layout.module.scss';

// 유튜브, 치지직 둘 다 position fixed로 스티키 헤더를 만들더라
export default function Layout({children}: PropsWithChildren) {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}/>
      {children}
    {/* footer */}
    </div>
  );
}
