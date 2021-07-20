import React from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';
import {privateGerServerSideProps} from '../../../src/utils/api/auth';

interface PageProp {
  username: string;
}

export const getServerSideProps: GetServerSideProps<PageProp> = async (context) => {
  return privateGerServerSideProps<PageProp>({context}, (currentlyUserInfo) => {
    const username = `${currentlyUserInfo.userPk}로 API 호출해서 응답받은 사용자의 이름`;
    
    return {
      props: {
        username
      }
    };
  });
};

export default function PrivatePage({username}: PageProp) {
  return (
      <>
        <Head>
          <title>private-page</title>
        </Head>
        <div>
          로그인 해야만 들어올 수 있는 페이지, username={username}
        </div>
      </>
  );
}
