import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@component/atom/button/button-presets';
import {useRouter} from 'next/router';
import {getSSPForNotLoggedIn, LOGIN_REDIRECT_QUERY_KEY} from '@util/auth/auth';
import {validateStringInQueryString} from '@util/extend/query-string';

export default function LoginPage() {
  
  const {query, replace} = useRouter();
  
  const onClick = useCallback(async () => {
    await replace(validateStringInQueryString(query[LOGIN_REDIRECT_QUERY_KEY]) ?? '/');
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

export const getServerSideProps = getSSPForNotLoggedIn;
