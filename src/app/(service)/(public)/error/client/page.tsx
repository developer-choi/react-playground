'use client';

import {getTestStatus401ClientApi} from '@/utils/service/api/test/status401';
import {useCallback} from 'react';
import {signOut} from 'next-auth/react';
import {LoginError} from '@/utils/service/auth/redirect';

// URL: http://localhost:3000/error/client
export default function Status401CC() {
  const onClick = useCallback(async () => {
    try {
      await Promise.all([
        getTestStatus401ClientApi(),
        getTestStatus401ClientApi(),
        getTestStatus401ClientApi(),
        getTestStatus401ClientApi()
      ]);
    } catch (error) {
      // 이부분이 원래는 handleClientSideError()로 대체되야함
      if (error instanceof LoginError) {
        signOut({
          callbackUrl: error.loginUrlWithRedirect
        });
      }
    }
  }, []);

  return (
    <button onClick={onClick}>Click Me</button>
  );
}
