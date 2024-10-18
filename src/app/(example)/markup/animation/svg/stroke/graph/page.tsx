import styles from './page.module.scss';
import Image from 'next/image';
import background from '/public/imgs/graph-background.png';

/**
 * URL: http://localhost:3000/markup/animation/svg/stroke/graph
 * Doc: https://docs.google.com/document/d/1rENwunYx0ULI-znoI9LbClY4u7yL9fpyq9AIcWb7-Q4/edit?tab=t.0
 * Example: https://www.youtube.com/watch?v=k-SI1xHN0x8&list=PL5e68lK9hEzd-ZM4Km6xUia-mxQp52G6U&index=2
 */
export default function Page() {
  return (
    <div style={{position: 'relative', width: 'fit-content'}}>
      <Image quality={100} className={styles.background} src={background} alt="백그라운드 이미지"/>
      <svg className={styles.animation} width="547" height="229" viewBox="0 0 547 229" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 226C29.2805 226 431.501 226 544 2" stroke="#F56F16" strokeWidth="6" />
      </svg>
    </div>
  );
}
