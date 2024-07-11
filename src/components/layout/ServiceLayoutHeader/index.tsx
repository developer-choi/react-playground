'use client';

import styles from './index.module.scss';
import {signOut, useSession} from 'next-auth/react';
import {useCallback} from 'react';
import Link from 'next/link';

export default function ServiceLayoutHeader() {
  const session = useSession();

  const logout = useCallback(() => {
    signOut({
      redirect: false
    });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.gnb}>
        <Link href="/">Home</Link>
        <Link href="/mypage?key=한글">Mypage</Link>
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
