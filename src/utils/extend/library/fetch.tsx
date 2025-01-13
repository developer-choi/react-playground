import {Session} from 'next-auth';
import {getSession, signOut} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {auth} from '@/utils/service/auth';
import {isServer} from '@/utils/extend/library/next';
import {InvalidEnvironmentError, FetchError, LoginError, ServicePermissionDeniedError} from '@/utils/service/error/both-side';
import {ConvertableQuery, stringifyQuery} from '@/utils/extend/browser/query-string/convert';
import {hasPermission, parsePermissionsinSession, Permission} from '@/utils/extend/permission';

/** customFetchOnXXXSide() 공통 주석
 * @throws LoginError 세션정보가 없는 상태로 API를 호출하려고 시도하거나, API에서 401에러가 응답된 경우 발생
 */

export async function customFetchOnClientSide(input: string | URL | globalThis.Request, parameter: ExtendedCustomFetchParameter) {
  if(isServer()) {
    throw new InvalidEnvironmentError('customFetchOnClientSide()는 Server Side에서 호출되면 안됩니다.');
  }

  try {
    const session = await getSession();
    return await customFetch(input, {...parameter, session});
  } catch (error: any) {
    if (error instanceof LoginError) {
      const redirectUrl = location.pathname + location.search;

      await signOut({
        redirect: false
      });

      throw new LoginError("Login is required", `/guest/login?redirect=${encodeURIComponent(redirectUrl)}`);
    } else {
      throw error;
    }
  }
}

export async function customFetchOnServerSide(input: string | URL | globalThis.Request, parameter: ExtendedCustomFetchParameter) {
  if(!isServer()) {
    throw new InvalidEnvironmentError('customFetchOnServerSide()는 Client Side에서 호출되면 안됩니다.');
  }

  try {
    const session = await auth();
    return await customFetch(input, {...parameter, session});
  } catch (error: any) {
    if (error instanceof LoginError) {
      const currentUrl = require('next/headers').headers().get('current-pathname-with-search') ?? '/'; // middleware에서 셋팅
      redirect(`/api/next-auth/logout?redirect=${currentUrl}`);

    } else {
      throw error;
    }
  }
}

/**
 * authorize none으로 client / server side 어디에서나 호출하기 위한 함수.
 * 그래서 로그인 체크도 하지않고,
 * 로그인이 실패할 일도 없어서 로그인 실패 처리로직도 없음.
 */
export async function customFetchOnBothSide(input: string | URL | globalThis.Request, parameter: Omit<ExtendedCustomFetchParameter, 'authorize'>) {
  return await customFetch(input, {...parameter, session: null, authorize: 'none'});
}

export interface CustomResponse extends Pick<Response, 'status' | 'headers' | 'url'> {
  json: any; // TODO 추후 제네릭 추가예정
  text: string | '';
}

export type RevalidateTagType = 'board-list';

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
interface ExtendedCustomFetchParameter extends Omit<RequestInit, 'body'> {
  body?: RequestInit['body'] | object;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  query?: ConvertableQuery;

  /**
   * none = request에 accessToken을 싣지않음.
   * public = 로그인되어있으면 accessToken을 request에 실음
   * private = public 특징 포함하며, 로그인 안되어있으면 LoginError 던짐
   * guest = 로그인이 되어있으면 GuestError를 던짐
   *
   * 이 4개는 권한이 필요없는것으로 간주
   */

  /** Permission는 "최소" private의 특징을 상속받음.
   * 권한이 필요한 API를 호출하기 직전에, 로그인 한 유저의 권한이 충분한지 체크. (API 호출 '전'에 체크)
   * 각각의 환경에 따라, 처리가 달라짐.
   * 1. Client Side에서는 모달이 뜨고 끝남
   * 2. Server Side에서는 403 에러페이지가 노출됨.
   */
  authorize: 'private' | 'public' | 'none' | 'guest' | Permission;

  next?: RequestInit['next'] & {
    tags?: RevalidateTagType[]
  };

  // cache ==> authorize 가 private이면, "기본" no-store로 설정됨. 로그인 해야만 얻을 수 있는 정보는 대부분 API 호출 시점에 최신화된 데이터가 필요한 경우가 많았음.
}

interface CustomFetchParameter extends ExtendedCustomFetchParameter {
  session: Session | null;
}

/** customFetch() 공통 주석
 * @throws LoginError 세션정보가 없는 상태로 API를 호출하려고 시도하거나, API에서 401에러가 응답된 경우 발생
 */
async function customFetch(input: string | URL | globalThis.Request, parameter: CustomFetchParameter) {
  const request = handleRequest(input, parameter);
  const response = await fetch(request.input, request.init);
  return handleResponse(response, request.permission);
}

function handleRequest(input: string | URL | globalThis.Request, parameter: CustomFetchParameter) {
  const {headers, session, authorize, body, query, cache, ...rest} = parameter;
  const newHeaders = new Headers(headers);
  const isPrivate = isAuthorizePrivate(authorize);

  if (isPrivate && !session) {
    throw LOGIN_ERROR;
  }

  if (authorize !== 'none' && session) {
    // access token 대신
    newHeaders.set("access-token'", session.user.access_token);
  }

  const permission = authorizeToPermission(authorize);
  const grantedPermissions = (!permission || !session) ? [] : parsePermissionsinSession(session.user.grantedPermissions);

  if(permission) {
    if (!session) {
      throw LOGIN_ERROR; // 로그인을 하지 않은 상태로 권한이 필요한 API를 호출할 수 없음.
    }

    if(!hasPermission(permission, grantedPermissions)) {
      throw new ServicePermissionDeniedError(permission, grantedPermissions);
    }
  }

  // GET의 경우에는 없고, 그 외 나머지는 JSON이 될 수도, Primitive일 수도 있음.
  if (typeof body === "object") {
    newHeaders.set("Content-Type", "application/json");
  }

  let requestUrl = typeof input !== "string" || input.startsWith("http") ? input : `${process.env.NEXT_PUBLIC_ORIGIN}${input}`;
  requestUrl += stringifyQuery(query);

  const init: RequestInit = {
    headers: newHeaders,
    body: typeof body === "object" ? JSON.stringify(body) : body,
    cache: (cache === undefined && isPrivate) ? 'no-store' : cache,
    ...rest
  };

  return {
    input: requestUrl,
    init,
    permission: {
      request: permission,
      granted: grantedPermissions
    }
  };
}

async function handleResponse(response: Response, permission: {request: Permission | undefined, granted: Permission[]}) {
  const contentType = response.headers.get("Content-Type");
  let json = {};
  let text = '';

  if (contentType && contentType.includes("application/json")) {
    json = await response.json();
  } else {
    text = await response.text();
  }

  const customResponse: CustomResponse = {
    status: response.status,
    url: response.url,
    headers: response.headers,
    json,
    text
  };

  if (response.ok) {
    return customResponse;
  }

  const defaultFetchError = new FetchError(customResponse);

  switch (response.status) {
    case 403:
      throw new ServicePermissionDeniedError(permission.request, permission.granted);

    case 401:
      throw LOGIN_ERROR;

    default:
      throw defaultFetchError;
  }
}

function authorizeToPermission(authorize: ExtendedCustomFetchParameter['authorize']): undefined | Permission {
  switch (authorize) {
    case 'private':
    case 'none':
    case 'guest':
    case 'public':
      return undefined;

    default:
      return authorize;
  }
}

function isAuthorizePrivate(authorize: ExtendedCustomFetchParameter['authorize']): boolean {
  switch (authorize) {
    case 'none':
    case 'guest':
    case 'public':
      return false;

    default:
      return true;
  }
}

const LOGIN_ERROR = new LoginError("Login is required");
