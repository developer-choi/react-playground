import type {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {getCookie, removeCookie} from '@util/extend/cookie';
import {useAppSelector} from '@store/hooks';
import AuthApi from '@api/AuthApi';
import {handleClientSideError} from '@util/handle-error/client-side-error';
import {AuthError} from '@util/auth/AuthError';
import {INITIAL_USER_INFO} from '@store/reducers/user';

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
export function useGetLoginUserPk(): number | undefined {
  const loggedIn = useIsLoggedIn();
  const userPk = useAppSelector(state => state.user.info.userPk);

  if (!loggedIn) {
    return undefined;

  } else {
    return userPk;
  }
}

/**
 * When rendering for the first time, return false even if you are logged in.
 * Use it only when you show the UI depending on whether you are logged in.
 *
 * Correct example: <button>{isLoggedIn ? 'Logout' : 'Login'}</button>
 * Incorrect example: useEffect(callback, [isLoggedIn])
 */
export function useIsLoggedIn() {
  return useAppSelector(state => state.user.info !== INITIAL_USER_INFO);
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

const LOGIN_REDIRECT_KEY_NAME = 'redirectUrl';

function getLoginRedirectUrl(redirectPath: string): string {
  return `/not-private/login?${LOGIN_REDIRECT_KEY_NAME}=${redirectPath}`;
}

function getLoginRedirectUrlServerSide(context: GetServerSidePropsContext) {
  return getLoginRedirectUrl(context.resolvedUrl);
}

function getLoginRedirectUrlClientSide() {
  return getLoginRedirectUrl(location.pathname);
}

export function getAfterLoginSuccessUrl() {
  const params = new URLSearchParams(location.search);
  return params.get(LOGIN_REDIRECT_KEY_NAME) ?? '/';
}

export async function logoutInClientSide(destination = '/') {
  const api = new AuthApi();

  try {
    await api.postLogout();
    removeCookie('userPk');
    removeCookie('anotherValue');
    location.replace(destination);
  } catch (error) {
    handleClientSideError(error);
  }
}
