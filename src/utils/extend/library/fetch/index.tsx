import {Session} from 'next-auth';
import {CustomizedApiErrorInfo, FetchError, GuestError, LoginError,} from '@/utils/service/error';
import {ConvertableQuery, stringifyQuery} from '@/utils/extend/browser/query-string/convert';

export interface ExtendedCustomFetchParameter extends Omit<RequestInit, 'body'> {
  body?: RequestInit['body'] | object;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  query?: ConvertableQuery;

  /**
   * none = request에 accessToken을 싣지않음.
   * guest = request에 accessToken을 싣지않음. + 로그인이 되어있으면 GuestError를 던짐
   * private = request에 accessToken을 포함함 + 로그인 안되어있으면 LoginError 던짐
   */
  authorize: 'private' | 'none' | 'guest';

  next?: RequestInit['next'] & {
    tags?: RevalidateTagType[]
  };

  response?: Partial<{
    /**
     * (default) auto
     * 1. Response의 Content-Type이 application/json인 경우 await response.json() 해서 json키에 저장함
     * 2. Response의 Content-Type이 text/plain인 경우 await response.text() 해서 text키에 저장함
     */
    dataType?: 'auto' | 'manual';
  }>;
}

/**
 * authorize none으로 client / server side 어디에서나 호출하기 위한 함수.
 * 그래서 로그인 체크도 하지않고,
 * 로그인이 실패할 일도 없어서 로그인 실패 처리로직도 없음.
 */
export async function customFetchOnBothSide<D>(input: string | URL | globalThis.Request, parameter: Omit<ExtendedCustomFetchParameter, 'authorize'>) {
  return customFetch<D>(input, {...parameter, session: null, authorize: 'none'});
}

export interface CustomFetchParameter extends ExtendedCustomFetchParameter {
  session: Session | null;
}

/** customFetch() 공통 주석
 * @throws LoginError 세션정보가 없는 상태로 API를 호출하려고 시도하거나, API에서 401에러가 응답된 경우 발생
 */
export async function customFetch<D>(input: string | URL | globalThis.Request, parameter: CustomFetchParameter) {
  const request = handleRequest(input, parameter);
  const response = await fetch(request.input, request.init);
  return handleResponse<D>(response, parameter);
}

export interface CustomResponse<D = any> extends Pick<Response, 'status' | 'url'> {
  data: D;
  original: Response;
}

export type RevalidateTagType = 'board-list';

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function handleRequest(input: string | URL | globalThis.Request, parameter: CustomFetchParameter) {
  const {headers, session, authorize, body, query, cache, response, ...rest} = parameter;
  const newHeaders = new Headers(headers);
  const isPrivate = authorize === 'private';

  if (isPrivate && !session) {
    throw LOGIN_ERROR;
  }

  if (authorize === 'guest' && session) {
    throw new GuestError();
  }

  if (authorize !== 'none' && session) {
    // access token 대신
    newHeaders.set('access-token', session.user.access_token);
  }

  // GET의 경우에는 없고, 그 외 나머지는 JSON이 될 수도, Primitive일 수도 있음.
  if (typeof body === 'object' && newHeaders.get('Content-Type') === null) {
    newHeaders.set('Content-Type', 'application/json');
  }

  let requestUrl = typeof input !== 'string' || input.startsWith('http') ? input : `${process.env.NEXT_PUBLIC_ORIGIN}${input}`;
  requestUrl += stringifyQuery(query);

  const init: RequestInit = {
    headers: newHeaders,
    body: typeof body !== 'object' || body instanceof Blob ? body : JSON.stringify(body),
    cache: (cache === undefined && authorize === 'none') ? 'force-cache' : cache,
    ...rest
  };

  return {
    input: requestUrl,
    init,
  };
}

async function handleResponse<D>(response: Response, parameter: CustomFetchParameter) {
  const data = await parseResponseData<D>(response, parameter);

  const customResponse: CustomResponse<D> = {
    status: response.status,
    url: response.url,
    data,
    original: response,
  };

  if (response.ok) {
    return customResponse;
  }

  const apiErrorInfo: CustomizedApiErrorInfo | undefined = (data && typeof data === 'object' && 'error' in data) ? data.error as CustomizedApiErrorInfo : undefined;
  const defaultFetchError = new FetchError(parameter, customResponse, apiErrorInfo);

  switch (response.status) {
    case 401:
      throw LOGIN_ERROR;

    default:
      throw defaultFetchError;
  }
}

async function parseResponseData<D>(response: Response, parameter: CustomFetchParameter): Promise<D> {
  const contentType = response.headers.get('Content-Type');
  const dataType = parameter.response?.dataType ?? 'auto';

  if (!contentType || dataType !== 'auto') {
    return null as D;
  }

  if (contentType.includes('application/json')) {
    return response.json();
  }

  if (contentType.includes('text/plain')) {
    return response.text() as Promise<D>;
  }

  return null as D;
}

const LOGIN_ERROR = new LoginError('Login is required');
