import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@component/atom/button/button-presets';
import {handleErrorInClientSide} from '@util/api/client-side-error';
import BoardApi from '@api/BoardApi';

export default function SomePage() {
  
  const privateCallback = useCallback(async () => {
    try {
      const api = new BoardApi();
      await api.postBoardCreate({} as any);
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
        <Button onClick={privateCallback}>로그인해야만 누를 수 있는 버튼</Button>
      </div>
    </>
  );
}
