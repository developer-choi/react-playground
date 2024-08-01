'use client';

import styles from './index.module.scss';
import {signOut, useSession} from 'next-auth/react';
import {useCallback} from 'react';
import Link from 'next/link';

export default function ServiceLayoutHeader() {
  const session = useSession();

  // https://docs.google.com/document/d/1PRzGtGusjqi4LfU0R4dC4wLPKfxQN5GcJ7JJXOAkdK0/edit
  const logout = useCallback(async () => {
    try {
      await backendLogoutApi();
      await signOut({
        redirect: false
      });
    } catch (error: any) {
      // [Authentication 요구사항 > Final step. 로그아웃 하기 (주로 헤더에있는)] https://docs.google.com/document/d/1p5jI5u3NZOHbRge9M0ZCmhQgqCriZfpUGks6I7blQlI/edit#heading=h.41h4ckzdotb

      await signOut({
        redirect: false
      });

      // already logout
      if (error.status === 401) {
        return;
      }

      throw error;
    }
  }, []);

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