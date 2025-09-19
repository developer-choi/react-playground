import styles from './layout.module.scss';
import {LayoutProps} from '@forworkchoe/core/utils';

// 유튜브, 치지직 둘 다 position fixed로 스티키 헤더를 만들더라
export default function Layout({children}: LayoutProps) {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}/>
      <main className={styles.page}>
        {children}
      </main>
    {/* footer */}
    </div>
  );
}
