import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@component/atom/button/button-presets';
import {useRouter} from 'next/router';
import {isCurrentlyLogin, LOGIN_REDIRECT_QUERY_KEY} from '@util/auth/auth';
import {validateValueInQueryString} from '@util/extend/query-string';
import type {GetServerSideProps} from 'next';

export default function LoginPage() {
  
  const {query, replace} = useRouter();
  
  const onClick = useCallback(async () => {
    await replace(validateValueInQueryString(query[LOGIN_REDIRECT_QUERY_KEY]) ?? '/');
  }, [replace, query]);
  
  return (
      <>
        <Head>
          <title>login</title>
        </Head>
        <div>
          여기는 로그인안하고 /examples/auth-flow/private 갔다가 리다이랙트되는 로그인 페이지임.
          <Button onClick={onClick}>로그인버튼</Button>
        </div>
      </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  
  if (isCurrentlyLogin()) {
    /**
     * Does not show "Already logged in".
     * I don't think there's anyone who doesn't know if they're logged in.
     * If there are more than one login page, this logic should be duplicated and separated separately.
     * Since most login pages are unique, all logic is written directly in this function.
     */
    return {
      redirect: {
        permanent: false,
        destination: '/' // main page path
      }
    };
  } else {
    return {
      props: {}
    };
  }
}
