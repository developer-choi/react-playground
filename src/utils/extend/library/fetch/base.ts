import {Session} from 'next-auth';
import {CustomizedApiErrorInfo} from '@/utils/service/error/class';
import {ConvertableQuery, stringifyQuery} from '@/utils/extend/browser/query-string/convert';
import {GuestError, LoginError} from '@/utils/service/error/class/auth';
import {FetchError, MismatchedApiResponseError} from '@/utils/service/error/class/fetch';

export interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: RequestInit['body'] | object;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  query?: ConvertableQuery;

  /**
   * optional = request에 accessToken을 싣긴함. (로그인이 되어있는 경우 한정) ==> 예시로 상품리스트&상세 페이지에서 상품의 좋아요 여부 응답하는 API의 경우 필요.
   * none = request에 accessToken을 싣지않음. ==> Static Build 해야하는 페이지의 경우 사용
   * guest = request에 accessToken을 싣지않음. + 로그인이 되어있으면 GuestError를 던짐
   * private = request에 accessToken을 포함함 + 로그인 안되어있으면 LoginError 던짐
   */
  authPolicy: 'none' | 'optional' | 'guest' | 'private';

  next?: RequestInit['next'] & {
    tags?: RevalidateTagType[]
  };

  response?: Partial<{
    /**
     * (default) auto
     * 1. Response의 Content-Type이 application/json인 경우 await response.json() 해서 data에 저장함
     * 2. Response의 Content-Type이 text/plain인 경우 await response.text() 해서 data에 저장함
     */
    dataType?: 'auto' | 'manual';
  }>;
}

/** @deprecated
 * authPolicy none으로 client / server side 어디에서나 호출하기 위한 함수.
 * 그래서 로그인 체크도 하지않고,
 * 로그인이 실패할 일도 없어서 로그인 실패 처리로직도 없음.
 */
export async function customFetchOnBothSide<D>(input: string | URL | globalThis.Request, options: Omit<FetchOptions, 'authPolicy'>) {
  return customFetch<D>(input, {...options, session: null, authPolicy: 'none'});
}

export interface FetchOptionsWithSession extends FetchOptions {
  session: Session | null;
}

/** customFetch() 공통 주석
 * @throws LoginError 세션정보가 없는 상태로 API를 호출하려고 시도하거나, API에서 401에러가 응답된 경우 발생
 */
export async function customFetch<D>(input: string | URL | globalThis.Request, options: FetchOptionsWithSession) {
  const request = handleRequest(input, options);
  const response = await fetch(request.input, request.init);
  return handleResponse<D>(response, options);
}

export interface FetchResult<D = any> extends Pick<Response, 'status' | 'url'> {
  data: D;
  original: Response;
}

export type RevalidateTagType = 'board-list';

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function handleRequest(input: string | URL | globalThis.Request, options: FetchOptionsWithSession) {
  const {headers, session, authPolicy, body, query, cache, ...rest} = options;
  const newHeaders = new Headers(headers);
  const isPrivate = authPolicy === 'private';

  if (isPrivate && !session) {
    throw LOGIN_ERROR;
  }

  if (authPolicy === 'guest' && session) {
    throw new GuestError();
  }

  if (authPolicy !== 'none' && session) {
    // access token 대신
    newHeaders.set('access-token', session.user.access_token);
  }

  // GET의 경우에는 없고, 그 외 나머지는 JSON이 될 수도, Primitive일 수도 있음.
  if (typeof body === 'object' && newHeaders.get('Content-Type') === null) {
    newHeaders.set('Content-Type', 'application/json');
  }

  let requestUrl = typeof input !== 'string' || input.startsWith('http') ? input : `${process.env.NEXT_PUBLIC_ORIGIN}${input}`;
  requestUrl += stringifyQuery(query);

  const needStringify = typeof body === 'object' && !(body instanceof Blob) && !(body instanceof FormData);

  const init: RequestInit = {
    headers: newHeaders,
    body: needStringify ? JSON.stringify(body) : body,
    cache: cache === undefined && authPolicy === 'none' ? 'force-cache' : cache,
    ...rest
  };

  return {
    input: requestUrl,
    init,
  };
}

async function handleResponse<D>(response: Response, options: FetchOptionsWithSession) {
  const data = await extractResponseData<D>(response, options);

  const fetchResult: FetchResult<D> = {
    status: response.status,
    url: response.url,
    data,
    original: response,
  };

  if (response.ok) {
    return fetchResult;
  }

  const apiErrorInfo: CustomizedApiErrorInfo | undefined = (data && typeof data === 'object' && 'error' in data) ? data.error as CustomizedApiErrorInfo : undefined;
  const defaultFetchError = new FetchError(options, fetchResult, apiErrorInfo);

  switch (response.status) {
    case 401:
      throw LOGIN_ERROR;

    default:
      throw defaultFetchError;
  }
}

async function extractResponseData<D>(response: Response, options: FetchOptionsWithSession): Promise<D> {
  const contentType = response.headers.get('Content-Type');
  const dataType = options.response?.dataType ?? 'auto';

  if (!contentType || dataType !== 'auto') {
    return null as D;
  }

  // return await 한 이유는 이 메소드들에서 에러가 던져질 수 있기 때문.
  try {
    if (contentType.includes('application/json')) {
      return await response.json();
    }

    if (contentType.includes('text/plain')) {
      return (await response.text()) as D;
    }
  } catch (error) {
    throw new MismatchedApiResponseError(options, response);
  }

  throw new MismatchedApiResponseError(options, response);
}

const LOGIN_ERROR = new LoginError('Login is required');
