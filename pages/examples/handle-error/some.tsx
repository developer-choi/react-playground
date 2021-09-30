import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@component/atom/button/button-presets';
import {throwIfNotLoggedIn} from '@util/auth/auth';
import {handleErrorInClientSide} from '@util/api/client-side-error';

export default function SomePage() {
  
  const someCallback = useCallback(() => {
    try {
      const {userPk} = throwIfNotLoggedIn();
      alert(`로그인한 사용자 ${userPk}가 버튼을 클릭했음.`);
    } catch (error) {
      handleErrorInClientSide(error);
    }
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
