import {PropsWithChildren} from 'react';
import styles from './index.module.scss';

export default function Layout({children}: PropsWithChildren) {
  return (
    <div className={styles.wrap}>
      {children}
    </div>
  );
}
