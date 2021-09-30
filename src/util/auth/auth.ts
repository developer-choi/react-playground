import {urlStringify} from '@util/extend/query-string';
import {ClientSideError} from '@util/api/client-side-error';

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
  return {
    userPk: 1234,
    anotherToken: 'ASDkjldas9023nasd-daskl-123lkda'
  };
  
  // return undefined;
}

export function isCurrentlyLogin(): boolean {
  return !!getCurrentlyLoginUserInfo();
}

export const LOGIN_REDIRECT_QUERY_KEY = 'redirectUrl';

export function getLoginRedirectUrl(redirectUrl?: string) {
  if (redirectUrl) {
    return `/examples/handle-error/login${urlStringify({[LOGIN_REDIRECT_QUERY_KEY]: redirectUrl})}`;
  } else {
    return `/examples/handle-error/login`;
  }
}

export function throwIfNotLoggedIn() {
  const currentlyUserInfo = getCurrentlyLoginUserInfo();
  
  if (!currentlyUserInfo) {
    throw new ClientSideError('로그인 후 이용이 가능합니다.', {
      cause: 'UN_AUTHENTICATION',
    });
  }
  
  return currentlyUserInfo;
}
