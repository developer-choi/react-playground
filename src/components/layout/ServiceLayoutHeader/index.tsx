'use client';

import styles from './index.module.scss';
import {signOut, useSession} from 'next-auth/react';
import {useCallback} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function ServiceLayoutHeader() {
  const session = useSession();
  const pathname = usePathname();

  const logout = useCallback(async () => {
    try {
      await backendLogoutApi();
      await signOut({
        redirect: false
      });
    } catch (error) {
      await signOut({
        redirect: false
      });

      throw error;
    }
  }, []);

  // Next Auth 테스트 안하는 페이지에서는 안나오도록 수정
  if (VISIBLE_ROOT_PATH.some(visibleRootPath => pathname.includes(visibleRootPath))) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.gnb}>
        <Link href="/">Home</Link>
        <Link href="/mypage?key=한글">Mypage</Link>
        <Link href="/error/server">Server 401</Link>
        <Link href="/error/client">Client 401</Link>
      </div>

      {/* 로딩중이면, 세션정보 갖고있는지 여부로 체크하고, 그게 아니라면 status로 체크 */}
      {session.status === 'loading' ? !!session.data : session.status === 'authenticated' ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <Link href="/guest/login">로그인</Link>
      )}
    </header>
  );
}

async function backendLogoutApi() {

}

const VISIBLE_ROOT_PATH = [
  '/experimental',
  '/solution',
  '/study'
];
