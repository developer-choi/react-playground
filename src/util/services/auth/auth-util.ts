import type {GetServerSideProps} from 'next';
import {QueryClient} from '@tanstack/query-core';
import {dehydrate, type DehydratedPageProps} from '@tanstack/react-query';
import {getLoginTokenInCookie, isLoggedInCookie} from '@util/services/auth/auth-token';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import {fetchAuthInServerSide} from '@util/services/auth/auth-user-cache';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import type {AuthError} from '@util/services/auth/auth-redirect';

export const getSSPForNotLoggedIn: GetServerSideProps<{}> = async context => {
  if (isLoggedInCookie(context)) {
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

export const getSSPForLoggedIn: GetServerSideProps<{}> = async context => {
  try {
    getLoginTokenInCookie({
      context,
      throwable: true
    });

    return {
      props: {}
    };
  } catch (error) {
    return handleServerSideError(error);
  }
};

// 주로 마이페이지 하위 페이지에서 쓰기 위함. Server Side에서 유저정보 API 하나만 호출하는 경우에 주로 사용.
export const getSSPForFetchAuth: GetServerSideProps<DehydratedPageProps> = async (context) => {
  const queryClient = new QueryClient();

  try {
    await fetchAuthInServerSide(queryClient, context);

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch (error) {
    return handleServerSideError(error);
  }
};

export function useAlertForNotLoggedIn() {
  const {push} = useRouter();

  return useCallback(() => {
    try {
      getLoginTokenInCookie({
        throwable: true
      });
    } catch (error) {
      const {message, option: {redirectPath}} = error as AuthError;

      if (confirm(message)) {
        push(redirectPath).then();
      }
    }
  }, [push]);
}
