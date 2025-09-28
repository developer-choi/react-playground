import styles from './page.module.scss';
import {CustomImage} from '@forworkchoe/core/components';

// URL: http://localhost:3000/staging/module/image/default-style
// Doc: https://docs.google.com/document/d/1ZX8A70x6DlfBDeVmBDUdE5-B4hSGtPHKURaVW_IXUuE/edit
export default function Page() {
  return (
    <div>
      <div className={styles.bigContainer}>
        <CustomImage width={1500} height={200} src={src} alt="큰 이미지"/>
        <NextElement/>
      </div>
      <div className={styles.smallContainer}>
        <CustomImage width={1500} height={200} src={src} alt="큰 이미지"/>
        <NextElement/>
      </div>
    </div>
  );
}

const src = 'https://picsum.photos/1500/200';

function NextElement() {
  return (
    <div style={{width: 300, height: 50, backgroundColor: 'red'}}/>
  );
}