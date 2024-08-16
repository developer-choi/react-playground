import styles from './page.module.scss';
import ActiveLink from '@/components/element/link/ActiveLink';

/**
 * URL : http://localhost:3000/markup/module/active-link/exact
 * Doc : [Active Link] https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit
 * href에 pathname을 적어도 안적어도 잘 동작하는거 테스트 + exact mode
 */
export default function Page() {
  return (
    <>
      <div className={styles.simpleTab}>
        <ActiveLink className={styles.link} href={`${boardListHref}?sort=desc`} enableActive={{mode: 'exact', className: styles.active}}>desc</ActiveLink>
        <ActiveLink className={styles.link} href={`${boardListHref}?sort=asc`} enableActive={{mode: 'exact', className: styles.active}}>asc</ActiveLink>
      </div>

      <div className={styles.simpleTab}>
        <ActiveLink className={styles.link} href="?sort=desc" enableActive={{mode: 'exact', className: styles.active}}>desc</ActiveLink>
        <ActiveLink className={styles.link} href="?sort=asc" enableActive={{mode: 'exact', className: styles.active}}>asc</ActiveLink>
      </div>
    </>
  );
}

const boardListHref = '/markup/module/active-link/exact';
