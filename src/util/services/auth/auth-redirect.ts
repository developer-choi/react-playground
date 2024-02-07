import {useRouter} from 'next/router';
import {useCallback} from 'react';
import type {GetServerSidePropsResult} from 'next';

export function getAfterLoginSuccessUrl() {
  const redirectUrl = new URLSearchParams(location.search).get(LOGIN_REDIRECT_QUERY_KEY);

  if (redirectUrl === null) {
    return '/';
  }

  return decodeURIComponent(redirectUrl);
}

/**
 * 로그인 안해놓고 로그인이 필요한 서비스를 이용하려고 한 경우 발생
 * 구체적으로, LoginToken이 없는데 LoginToken이 필요한 API를 호출하려고 하는경우 그전에 이 에러가 떠서 막히도록 구현됨.
 */
export class AuthError extends Error {
  option: AuthErrorOption;

  constructor(message: string, option: AuthErrorOption) {
    super(message);
    this.option = {
      redirectPath: `/experimental/handle-error/login?${LOGIN_REDIRECT_QUERY_KEY}=${encodeURIComponent(option.redirectPath)}`
    };
  }
}

interface AuthErrorOption {
  redirectPath: string;
}

/**
 * Case1. 그냥 로그인 안해놓고 로그인해야만 누를 수 있는 버튼을 누른 경우
 * Case2. 다른탭에서 로그아웃해놓고 지금 보고있는 페이지(in private or in public)에서 로그인해야 누를 수 있는 버튼 누른경우
 * - 이미 로그아웃은 되어있다고 예상하고있고,
 * - AuthError가 발생했다는것은 쿠키에 LoginToken이 없다는것이므로
 * - queryClient로 rq에 저장된 유저정보만 초기화해서 유저정보, 로그인여부만 다시 초기화하려고하는것
 */
export function useHandleAuthErrorInClient() {
  const {push} = useRouter();

  return useCallback((error: AuthError) => {
    if (confirm(error.message)) {
      push(error.option.redirectPath);
    }
  }, [push]);
}

/**
 * 마이페이지같은 private 페이지에 접근했을 때 AuthError가 발생하면
 * 로그인페이지로 리다이랙트 해주는 방식으로 처리해야함.
 */
export function handleAuthErrorInServer(error: AuthError): GetServerSidePropsResult<any> {
  return {
    redirect: {
      permanent: false,
      destination: error.option.redirectPath
    }
  };
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const LOGIN_REDIRECT_QUERY_KEY = 'redirectPath';
