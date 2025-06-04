import styles from './index.module.scss';
import {LayoutProps} from '@/types/declaration/next';

export default function Layout({children}: LayoutProps) {
  return (
    <div className={styles.wrap}>
      {children}
    </div>
  );
}
