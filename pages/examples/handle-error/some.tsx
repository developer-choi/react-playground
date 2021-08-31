import React, {useCallback} from 'react';
import Head from 'next/head';
import { Button } from '@components/atom/button/button-presets';
import {executeOnlyLogin} from '../../../src/utils/auth/auth';

export default function SomePage() {
  
  const someCallback = useCallback(() => {
    executeOnlyLogin(userInfo => {
      alert(`로그인한 사용자 ${userInfo.userPk}가 버튼을 클릭했음.`);
    });
  }, []);
  
  return (
      <>
        <Head>
          <title>some-page</title>
        </Head>
        <div>
          <Button onClick={someCallback}>로그인해야만 누를 수 있는 버튼</Button>
        </div>
      </>
  );
}
