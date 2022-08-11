import {urlStringify} from '@util/extend/query-string';
import type {GetServerSideProps, GetServerSidePropsContext} from 'next';

/**
 * 로그인이 되어있는 유저라면 반드시 갖고있어야하는 값의 타입.
 * 이걸로 private API를 호출할 때 사용할 예정.
 *
 * 이 타입의 값을 쿠키나 로컬스토리지같은 어떠한 저장공간에 저장을 하고있어야함.
 */
export interface LoginToken {
  userPk: number;
  anotherValue: string;
}

function getLoginToken(context?: GetServerSidePropsContext): LoginToken | undefined {

  // ServerSide
  if (context) {
    return {
      userPk: 1234,
      anotherValue: 'ASDkjldas9023nasd-daskl-123lkda'
    };
  }

  // ClientSide
  return {
    userPk: 1234,
    anotherValue: 'ASDkjldas9023nasd-daskl-123lkda'
  };
}

export function getLoginTokenClientSide(): LoginToken {
  const loginToken = getLoginToken();

  if (!loginToken) {
    throw new AuthError('로그인 후 이용이 가능합니다.', {
      redirectUrl: getLoginRedirectUrl(location.pathname)
    });
  }

  return loginToken;
}

export function getLoginTokenServerSide(context: GetServerSidePropsContext): LoginToken {
  const loginToken = getLoginToken(context);

  if (!loginToken) {
    throw new AuthError("로그인 후 이용이 가능합니다.", {
      redirectUrl: getLoginRedirectUrl(context.resolvedUrl)
    });
  }

  return loginToken;
}

function isLoggedInServerSide(context: GetServerSidePropsContext): boolean {
  return !!getLoginTokenServerSide(context);
}

export const getSSPForNotLoggedIn: GetServerSideProps = async (context) => {
  if (isLoggedInServerSide(context)) {
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

export const LOGIN_REDIRECT_QUERY_KEY = 'redirectUrl';

export function getLoginRedirectUrl(redirectUrl?: string) {
  if (redirectUrl) {
    return `/examples/handle-error/login${urlStringify({[LOGIN_REDIRECT_QUERY_KEY]: redirectUrl})}`;
  } else {
    return `/examples/handle-error/login`;
  }
}

export class AuthError extends Error {
  option: AuthErrorOption;

  constructor(message: string, option: AuthErrorOption) {
    super(message);
    this.option = option;
  }
}

export interface AuthErrorOption {
  redirectUrl: string;
}
