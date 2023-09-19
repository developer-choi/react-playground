import type {GetServerSidePropsContext} from 'next';
import {getCookie} from '@util/extend/browser/cookie';
import {AuthError} from '@util/services/auth/AuthError';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {putAuthLogoutApi} from '@api/auth-api';
import {useClearLoginUserInfo} from '@util/services/auth/auth-user';

export interface LoginToken {
  userPk: number;
  accessToken: string;
}

export const LOGIN_TOKEN = 'loginToken';

type ConditionalResultType<T extends boolean> = T extends true ? LoginToken : LoginToken | undefined;

interface LoginTokenParam<T extends boolean> {
  context?: GetServerSidePropsContext;
  throwable?: T;
}

/**
 * Only for logic (Server Side or Client Side)
 */
export function getLoginTokenInCookie<T extends boolean = false>(param?: LoginTokenParam<T>): ConditionalResultType<T> {
  const {throwable = false, context} = param ?? {}

  const cookie = getCookie(LOGIN_TOKEN, context)

  let loginToken: LoginToken | undefined;

  if (!cookie) {
    loginToken = undefined

  } else {
    try {
      loginToken = JSON.parse(cookie) as LoginToken
    } catch (error) {
    }
  }

  if (!loginToken) {
    const redirectPath = context ? context.resolvedUrl : `${location.pathname}${location.search}${location.hash}`

    if (throwable) {
      throw new AuthError('Login is required.', {
        redirectUrl: `/experimental/handle-error/login?${LOGIN_REDIRECT_KEY_NAME}=${redirectPath}`
      });
    } else {
      return undefined as ConditionalResultType<T>
    }
  }

  return loginToken as ConditionalResultType<T>;
}

/**
 * Only for logic (Server Side or Client Side)
 * If you want to check in rendering, you should use useLoginStatus()
 */
export function isLoggedInCookie(context?: GetServerSidePropsContext) {
  try {
    return !!getLoginTokenInCookie({
      context,
      throwable: true
    });
  } catch (error) {
    return false;
  }
}

const LOGIN_REDIRECT_KEY_NAME = 'redirectUrl';

export function getAfterLoginSuccessUrl() {
  const redirectUrl = new URLSearchParams(location.search).get(LOGIN_REDIRECT_KEY_NAME);
  const hash = location.hash;

  if (redirectUrl === null) {
    return "/" + hash;
  }

  return redirectUrl + hash;
}

export function useLogout() {
  const clearLoginUserInfo = useClearLoginUserInfo();

  return useCallback( async (destination = '/') => {
    try {
      clearLoginUserInfo();
      await putAuthLogoutApi();

      /**
       * removeCookie(LOGIN_TOKEN)
       *
       * 만약 로그아웃 API에서 login token 쿠키 지워줄 경우, 저 코드를 작성할 필요는 없음.
       *
       * 하지만 API에서 쿠키삭제 안해주는경우, 정확히 저 코드라인에 코드 작성해야함.
       * 저걸 API 호출전에 실행하면 로그아웃 API 호출할 때 request header Authorization에 액세스토큰값 못가져와서 401 응답됨.
       */

      location.replace(destination);
    } catch (error) {
      if (error instanceof AuthError) {
        location.replace(destination);
      } else {
        console.error(error)
      }
    }
  }, [clearLoginUserInfo])
}

export default function useAlertForNotLoggedIn() {
  const {push} = useRouter();

  return useCallback(() => {
    try {
      getLoginTokenInCookie({
        throwable: true
      });
    } catch (error) {
      const {message, option: {redirectUrl}} = error as AuthError;

      if (confirm(message)) {
        push(redirectUrl).then();
      }
    }
  }, [push]);
}
