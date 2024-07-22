import {isMobileOnBothSide} from '@/utils/extend/library/next';
import styles from './page.module.scss';
import classNames from 'classnames';

// 필기는 ./layout.tsx에 했음.
// URL: http://localhost:3000/solution/device/conditional
// Doc: https://docs.google.com/document/d/1H_gqRM99G70PBzAXRO8ejvhaWIJjaJ7VsGilHDtenOQ/edit
export default function Page() {
  const isMobile = isMobileOnBothSide();
  const mobileClass = {[styles.mobile]: isMobile};

  return (
    <div className={classNames(styles.wrap, mobileClass)}>
      <h1 className={classNames(styles.h1, mobileClass)}>Home Page</h1>
    </div>
  );
}
