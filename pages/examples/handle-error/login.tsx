import React, {useCallback, useEffect} from 'react';
import Head from 'next/head';
import {Button} from '@component/atom/button/button-presets';
import {useRouter} from 'next/router';
import {getAfterLoginSuccessUrl, getSSPForNotLoggedIn} from '@util/auth/auth';
import {handleErrorInClientSide} from '@util/api/client-side-error';
import AuthApi from '@api/AuthApi';
import {useAppDispatch} from '@store/hooks';
import {setUserActionCreator} from '@store/reducers/user';

export default function LoginPage() {
  const {prefetch, replace} = useRouter();
  const dispatch = useAppDispatch();

  const onClick = useCallback(async () => {
    const email = 'test-email';
    const password = 'test-password';
    const api = new AuthApi();

    try {
      const {data: {info}} = await api.postLogin(email, password);
      dispatch(setUserActionCreator(info));
      const redirectUrl = getAfterLoginSuccessUrl();
      replace(redirectUrl).then();
    } catch (error) {
      handleErrorInClientSide(error);
    }
  }, [dispatch, replace]);

  useEffect(() => {
    const redirectUrl = getAfterLoginSuccessUrl();
    prefetch(redirectUrl).then();
  }, [prefetch, replace]);

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
