import Router from 'next/router';
import { urlStringify } from '../extend/query-string';

/**
 * 로그인이 되어있는 유저라면 반드시 갖고있어야하는 값의 타입.
 * 이걸로 private API를 호출할 때 사용할 예정.
 *
 * 이 타입의 값을 쿠키나 로컬스토리지같은 어떠한 저장공간에 저장을 하고있어야함.
 */
export interface CurrentlyLoginUserInfo {
  userPk: number;
  anotherToken: string;
}

export function getCurrentlyLoginUserInfo(): CurrentlyLoginUserInfo | undefined {
  // return {
  //   userPk: 1234,
  //   anotherToken: 'ASDkjldas9023nasd-daskl-123lkda'
  // };
  
  return undefined;
}

export function isCurrentlyLogin(): boolean {
  return !!getCurrentlyLoginUserInfo();
}

export const LOGIN_REDIRECT_QUERY_KEY = 'redirectUrl';

export function getLoginRedirectUrl(redirectUrl?: string) {
  if (redirectUrl) {
    return `/examples/auth-flow/login${urlStringify({[LOGIN_REDIRECT_QUERY_KEY]: redirectUrl})}`;
  } else {
    return `/examples/auth-flow/login`;
  }
}

export type LoggedInCallback = (userInfo: CurrentlyLoginUserInfo) => void | Promise<void>;
export type NotLoggedInCallback = (replaceLoginCallback: () => ReturnType<typeof Router.replace>) => void;

const defaultNotLoggedInCallback: NotLoggedInCallback = async callback => {
  alert('로그인 후 이용이 가능합니다.');
  await callback();
}

export interface RunOnlyLoginConfig {
  notLoggedInCallback?: NotLoggedInCallback;
}

export function executeOnlyLogin(loggedInCallback: LoggedInCallback, config?: RunOnlyLoginConfig) {
  const currentlyUserInfo = getCurrentlyLoginUserInfo();
  
  if (!currentlyUserInfo) {
    const {pathname, search, hash} = location;
    const { notLoggedInCallback = defaultNotLoggedInCallback } = config ?? {};
    
    notLoggedInCallback(() => {
    
      /**
       * TODO 기존 페이지 URL에 쿼리스트링같은게 있을 수 있으니 이런것도 같이 redirectUrl의 query-string으로 들어갈 수 있도록 구현이 필요.
       */
      return Router.replace(getLoginRedirectUrl(`${pathname}${search}${hash}`));
    });
    return;
  }
  
  loggedInCallback(currentlyUserInfo);
}
