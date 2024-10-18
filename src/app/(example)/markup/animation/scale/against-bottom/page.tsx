import styles from './page.module.scss';

/**
 * URL: http://localhost:3000/markup/animation/scale/against-bottom
 *
 * Card에 마우스올려보면 scale이 원래 4방향으로 커지는데 바닥 방향으로 안커지도록 애니메이션이 들어가있음.
 */
export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.list}>
        <div className={styles.card} />
        <div className={styles.card} />
        <div className={styles.card} />
        <div className={styles.card} />
      </div>
    </div>
  );
}
