import classNames from 'classnames';
import styles from './index.module.scss';

// 필기는 ../layout.tsx에 했음.
// URL: http://localhost:3000/solution/device/parallel
// Doc: https://docs.google.com/document/d/1H_gqRM99G70PBzAXRO8ejvhaWIJjaJ7VsGilHDtenOQ/edit
export default function Page() {
  return (
    <h1 className={classNames(styles.h1)}>Home Page</h1>
  );
}
