import {ConvertableQuery, stringifyQuery} from '@/utils/extend/browser/query-string/convert';
import {ApiRequestError, ApiResponseError, MismatchedApiResponseError} from '@/utils/service/common/error/class/fetch';
import {NotAuthenticatedError} from '@forworkchoe/core/utils';

export interface BaseApiRequest extends Omit<RequestInit, 'body'> {
  body?: RequestInit['body'] | object;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

  // Backend의 GET API 에서 Request Parameter가 boolean / number로 되어있다 하더라도, 실제로 보내면 다 string이 됨.
  query?: ConvertableQuery;

  response?: Partial<{
    /**
     * (default) auto
     * 1. Response의 Content-Type이 application/json인 경우 await response.json() 해서 data에 저장함
     * 2. Response의 Content-Type이 text/plain인 경우 await response.text() 해서 data에 저장함
     */
    dataType?: 'auto' | 'manual';
  }>;
}

export interface BaseApiResponse<D = any> extends Pick<Response, 'status' | 'url'> {
  data: D;
  original: Response;
}

export default class BaseApi {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * @throws {ApiRequestError}
   * @throws {ApiResponseError}
   * @throws {NotAuthenticatedError}
   * @throws {MismatchedApiResponseError}
   */
  async request<D>(input: string, request: BaseApiRequest) {
    const {headers, body, query, ...rest} = request;
    const newHeaders = new Headers(headers);

    // GET의 경우에는 없고, 그 외 나머지는 JSON이 될 수도, Primitive일 수도 있음.
    if (typeof body === 'object' && newHeaders.get('Content-Type') === null) {
      newHeaders.set('Content-Type', 'application/json');
    }

    let requestUrl = input.startsWith('https://') ? input : `${this.baseUrl}${input}`;
    requestUrl += stringifyQuery(query);

    const needStringify = typeof body === 'object' && !(body instanceof Blob) && !(body instanceof FormData);

    const init: RequestInit = {
      headers: newHeaders,
      body: needStringify ? JSON.stringify(body) : body,
      ...rest
    };

    let response;

    try {
      response = await fetch(requestUrl, init);
    } catch (error) {
      throw new ApiRequestError(init, {url: requestUrl, cause: error})
    }

    const data = await extractResponseData<D>(response, request);

    const fetchResult: BaseApiResponse<D> = {
      status: response.status,
      url: response.url,
      data,
      original: response,
    };

    if (response.ok) {
      return fetchResult;
    }

    switch (response.status) {
      case 401:
        throw new NotAuthenticatedError('Login is required');

      default:
        throw new ApiResponseError(request, fetchResult);
    }
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
async function extractResponseData<D>(response: Response, options: BaseApiRequest): Promise<D> {
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
