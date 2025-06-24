import {timeoutPromise} from '@/utils/extend/random/promise';
import {Suspense} from 'react';
import {handleServerSideError} from '@/utils/service/error/server';
import {LoginError} from '@/utils/service/error/class/auth';

/**
 * URL: http://localhost:3000/staging/error/401/server?hello=world
 * Server Side에서 401에러가 동시에 여러번 발생했을 때에도 문제없이 동작하는지 테스트하기 위한 예제 페이지
 */
export default function Page() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <Test/>
      </Suspense>
      <Suspense fallback="Loading...">
        <Test/>
      </Suspense>
      <Suspense fallback="Loading...">
        <Test/>
      </Suspense>
    </div>
  );
}

async function Test() {
  try {
    await timeoutPromise(1000);

    if (2 > 1) {
      throw new LoginError('Login error occurred');
    }

    return null;
  } catch (error) {
    return handleServerSideError(error);
  }
}
