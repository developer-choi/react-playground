import styles from './page.module.scss';
import ActiveLink from '@/components/element/link/ActiveLink';

/**
 * URL : http://localhost:3000/solution/etc/active-link/community
 * Doc : [Active Link] https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit
 * href에 pathname을 적어도 안적어도 잘 동작하는거 테스트 + path mode
 */
export default function Page() {
  return (
    <>
      <div className={styles.simpleTab}>
        <ActiveLink className={styles.link} href={`${prefixPath}/community`} enableActive={{mode: 'path', className: styles.active}}>Community</ActiveLink>
        <ActiveLink className={styles.link} href={`${prefixPath}/mypage`} enableActive={{mode: 'path', className: styles.active}}>Mypage</ActiveLink>
      </div>

      <ActiveLink href={`${prefixPath}/community/free-board/1`} enableActive={{mode: 'path', className: styles.active}}>Community 하위</ActiveLink>
      <ActiveLink href={`${prefixPath}/mypage/change-password`} enableActive={{mode: 'path', className: styles.active}}>Mypage 하위</ActiveLink>

      <div>
        <ActiveLink href="?sort=desc" enableActive={{mode: 'path', className: styles.active}}>Desc</ActiveLink>
        <ActiveLink href="?sort=asc" enableActive={{mode: 'path', className: styles.active}}>Asc</ActiveLink>
      </div>
    </>
  );
}

const prefixPath = '/solution/etc/active-link';
