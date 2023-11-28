import type {GetServerSideProps} from "next";
import {handleServerSideError} from "@util/services/handle-error/server-side-error";
import {getLoginTokenInCookie, isLoggedInCookie} from "@util/services/auth/auth-token";
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import type {AuthError} from '@util/services/auth/AuthError';

export const getSSPForNotLoggedIn: GetServerSideProps = async context => {
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

export const LOGIN_REDIRECT_QUERY_KEY = 'redirectPath';

export function getAfterLoginSuccessUrl() {
  const redirectUrl = new URLSearchParams(location.search).get(LOGIN_REDIRECT_QUERY_KEY);
  const hash = location.hash;

  if (redirectUrl === null) {
    return "/" + hash;
  }

  return redirectUrl + hash;
}

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
