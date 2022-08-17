import type {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {getCookie} from '@util/extend/cookie';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useEffect} from 'react';
import UserApi from '@api/UserApi';
import {setUserActionCreator} from '@store/reducers/user';

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
  const userPk = getCookie('userPk', context);
  const anotherValue = getCookie('anotherValue', context);

  if (!userPk || !anotherValue) {
    return undefined;
  }

  return {
    userPk: Number(userPk),
    anotherValue
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
  try {
    return !!getLoginTokenServerSide(context);
  } catch (error) {
    return false;
  }
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

const LOGIN_REDIRECT_QUERY_KEY = 'redirectUrl';

export function getLoginRedirectUrl(redirectUrl?: string) {
  if (redirectUrl) {
    return `/examples/handle-error/login?${LOGIN_REDIRECT_QUERY_KEY}=${redirectUrl}`;
  } else {
    return `/examples/handle-error/login`;
  }
}

export function getAfterLoginSuccessUrl() {
  const params = new URLSearchParams(location.search);
  return params.get(LOGIN_REDIRECT_QUERY_KEY) ?? '/';
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

/**
 * When rendering for the first time, return false even if you are logged in.
 * Use it only when you show the UI depending on whether you are logged in.
 *
 * Correct example: <button>{isLoggedIn ? 'Logout' : 'Login'}</button>
 * Incorrect example: useEffect(callback, [isLoggedIn])
 */
export function useIsLoggedIn() {
  return useAppSelector(state => !!state.user.info);
}

/**
 * This function must only be called in _app.tsx
 */
export function useInitialUpdateUserInfo() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const loginToken = getLoginTokenClientSide();
        const api = new UserApi();
        const {data: {info}} = await api.getUser(loginToken.userPk);
        dispatch(setUserActionCreator(info));

      } catch (error) {
        // ignore AuthError
      }
    })().then();
  }, [dispatch]);
}
