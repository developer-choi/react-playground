import React, {useCallback} from 'react';
import Head from 'next/head';
import {Button} from '@components/atom/button/button-presets';
import {useRouter} from 'next/router';
import {LOGIN_REDIRECT_QUERY_KEY} from '../../../src/utils/api/auth';
import {queryStringValueConvertString} from '../../../src/utils/extend/query-string';

export default function LoginPage() {
  
  const {query, replace} = useRouter();
  
  const onClick = useCallback(async () => {
    /**
     * 리다이랙트할 곳이 있으면 거기로 리다이랙트하고, 없으면 기본페이지 (보통 탑페이지)로 이동
     */
    await replace(queryStringValueConvertString(query[LOGIN_REDIRECT_QUERY_KEY]) ?? '/');
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
