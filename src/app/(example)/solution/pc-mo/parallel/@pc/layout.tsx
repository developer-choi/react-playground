import styles from './index.module.scss';
import {LayoutProps} from '@forworkchoe/core/utils';

export default function Layout({children}: LayoutProps) {
  return (
    <div className={styles.wrap}>
      {children}
    </div>
  );
}
