import type {GetServerSidePropsContext} from 'next';
import {getCookie, setCookie} from '@util/extend/browser/cookie';
import {AuthError} from '@util/services/auth/AuthError';

export interface LoginToken {
  userPk: number;
  accessToken: string;
}

export function setLoginToken(loginToken: LoginToken) {
  setCookie({
    name: LOGIN_TOKEN,
    value: loginToken
  });
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
    let redirectPath: string

    try {
      redirectPath = context ? context.resolvedUrl : `${location.pathname}${location.search}${location.hash}`
    } catch (error) {
      console.error('Server Side에서 접근한 경우, api 함수에 context를 전달해주세요. 그래야 AuthError가 발생했을 때 redirectPath를 정확하게 지정할 수 있습니다.');
      redirectPath = '/'
    }

    if (throwable) {
      throw new AuthError('Login is required.', {
        redirectPath
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
  return !!getLoginTokenInCookie({context});
}
