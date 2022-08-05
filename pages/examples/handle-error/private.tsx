import React from 'react';
import Head from 'next/head';
import {getServerSidePropsTemplate} from '@util/api/server-side-error';
import {AuthError} from '@util/auth/auth';
import BoardApi from '@api/BoardApi';

interface PageProp {
  username: string;
}

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

export const getServerSideProps = getServerSidePropsTemplate<PageProp>(async (context) => {
  try {
    const api = new BoardApi();
    const someData = await api.getSomePrivateApiServerSide(context);

    return {
      props: {
        username: someData.data
      }
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        redirect: {
          permanent: false,
          destination: error.option.redirectUrl
        }
      };
    } else {
      throw error;
    }
  }
});
