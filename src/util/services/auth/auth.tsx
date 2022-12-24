import type {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {getCookie} from '@util/extend/cookie';
import {useAppSelector} from '@store/hooks';
import AuthApi from '@api/AuthApi';
import {AuthError} from '@util/services/auth/AuthError';
import {INITIAL_USER_INFO} from '@store/reducers/user';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import {handleClientSideError} from '@util/services/handle-error/client-side-error';
import {useRouter} from 'next/router';
import {useCallback} from 'react';

export interface LoginToken {
  userPk: number;
  anotherValue: string;
}

/**
 * Use this function to be returned undefined when no login token is present.
 * If you want AuthError to be thrown in the same situation, use getLoginTokenClientSide() or getLoginTokenServerSide().
 */
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

/**
 * Use this function to be thrown AuthError when no login token is present.
 */
export function getLoginTokenClientSide(): LoginToken {
  const loginToken = getLoginToken();

  if (!loginToken) {
    throw new AuthError('Login is required.', {
      loginPageUrlWithRedirectUrl: getLoginRedirectUrlClientSide()
    });
  }

  return loginToken;
}

/**
 * Use this function to be thrown AuthError when no login token is present.
 * If you want to be returned undefined in the same situation, use getLoginToken().
 */
export function getLoginTokenServerSide(context: GetServerSidePropsContext): LoginToken {
  const loginToken = getLoginToken(context);

  if (!loginToken) {
    throw new AuthError("Login is required.", {
      loginPageUrlWithRedirectUrl: getLoginRedirectUrlServerSide(context)
    });
  }

  return loginToken;
}

export function isLoggedInServerSide(context: GetServerSidePropsContext) {
  try {
    return !!getLoginTokenServerSide(context);
  } catch (error) {
    return false;
  }
}

/**
 * Unintended results can occur when used to determine whether you are logged in at the time of RENDERING. (In this case, use IsLoggedIn() instead.)
 */
export function isLoggedInClientSide() {
  try {
    return !!getLoginTokenClientSide();
  } catch (error) {
    return false;
  }
}

/**
 * Use only if you need to determine the userPK of the logged-in when RENDERED.
 *
 * @example
 * const userPk = useGetLoginUserPk();
 * return {userPk === authorPk ? <button onClick={removeReply}>Delete</button>}
 */
export function useGetLoginUserPk(): number | 'initial' | undefined {
  const loginStatus = useLoginStatus();
  const userPk = useAppSelector(state => state.user.info?.userPk);

  if (loginStatus === 'initial') {
    return 'initial';
  }

  return userPk;
}

/**
 * When rendering for the first time, return false even if you are logged in.
 * Use it only when you show the UI depending on whether you are logged in.
 *
 * Correct example: <button>{isLoggedIn === 'initial' ? '' : isLoggedIn ? 'Logout' : 'Login'}</button>
 * Incorrect example: useEffect(callback, [isLoggedIn])
 */
export function useLoginStatus(): boolean | 'initial' {
  return useAppSelector(state => {
    if (state.user.info === INITIAL_USER_INFO) {
      return 'initial';
    }

    return state.user.info !== undefined;
  });
}

export default function useAlertForNotLoggedIn() {
  const {push} = useRouter();

  return useCallback(() => {
    try {
      getLoginTokenClientSide();
    } catch (error) {
      const {message, option: {loginPageUrlWithRedirectUrl}} = error as AuthError;

      if (confirm(message)) {
        push(loginPageUrlWithRedirectUrl).then();
      }
    }
  }, [push]);
}

export const getSSPForNotLoggedIn: GetServerSideProps = async context => {
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

export const getSSPForLoggedIn: GetServerSideProps<{}> = async context => {
  try {
    getLoginTokenServerSide(context);

    return {
      props: {}
    };
  } catch (error) {
    return handleServerSideError(error);
  }
};

const LOGIN_REDIRECT_KEY_NAME = 'redirectUrl';

function getLoginRedirectUrl(redirectPath: string): string {
  return `/examples/handle-error/login?${LOGIN_REDIRECT_KEY_NAME}=${redirectPath}`;
}

function getLoginRedirectUrlServerSide(context: GetServerSidePropsContext) {
  return getLoginRedirectUrl(context.resolvedUrl);
}

export function getLoginRedirectUrlClientSide() {
  return getLoginRedirectUrl(location.pathname);
}

export function getAfterLoginSuccessUrl() {
  const params = new URLSearchParams(location.search);
  return params.get(LOGIN_REDIRECT_KEY_NAME) ?? '/';
}

export async function logoutInClientSide(destination = '/') {
  const api = new AuthApi();

  try {
    await api.putLogout();
    location.replace(destination);
  } catch (error) {
    if (error instanceof AuthError) {
      location.replace(destination);

    } else {
      handleClientSideError(error);
    }
  }
}
