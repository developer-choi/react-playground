import React from 'react';
import {useIsLoggedIn} from '@util/auth/auth';

export default function Page() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <div>
      <button className={isLoggedIn ? 'active' : 'inactive'}>{isLoggedIn ? '로그아웃' : '로그인'}</button>
    </div>
  );
}
