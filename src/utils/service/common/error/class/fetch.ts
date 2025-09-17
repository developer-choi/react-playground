import {FetchOptionsWithSession, FetchResult} from '@/utils/extend/library/fetch/base';
import {BaseError} from '@forworkchoe/core/utils';

// API에서 에러가 발생한 경우, 별도로 응답되는 에러 데이터. 있을 수도, 없을 수도 있음. (500에러, 404에러 등은 이런 데이터가 없음), 주로 POST / UPDATE에서 유효성검증 하다 실패했을 때 주로 사용함.
export interface ApiErrorDetail {
  type: string;
  message: string;
  params: any;
}

/**
 * API 호출이 성공했고, 응답값도 존재하지만, 2xx가 아닌 경우 발생함. (response.ok가 false)
 * 즉, API 호출조차도 실패한 케이스는 이 에러가 던져지지 않음. (Type Error 'Failed to fetch' 같은 케이스)
 * 단, 일부 에러코드는 별도의 에러클래스가 던져짐 (401)
 *
 * TODO
 * 비밀번호 같이 민감한 개인정보도 API로 보내다가 에러가 발생할 수 있는데,
 * 그럼 이 에러의 request 필드에 그 데이터가 그대로 들어가게됨.
 * 그럼 Sentry에서 관리자가 사용자의 개인정보를 알 수 있게됨.
 *
 * 이걸 막기 위한 방법은...
 * 1. 그런 데이터 보내는 곳마다 (a, b, c페이지 등등 전부다) 서버로 보낼 때 클라이언트에서 암호화 한다 (그럼 서버에서도 복호화 해야하지만, Sentry로 보내진 데이터를 관리자가 봐도 좀 나음)
 * 2. 에러를 ApiResponseError가 아닌 다른걸로 던지던가, ApiResponseError로 만들 때 그 데이터만 제외하고 만든다 (그럼 서버에서 복호화 안해도 됨)
 */
export class ApiResponseError extends BaseError {
  readonly request: FetchOptionsWithSession;
  readonly response: FetchResult;
  readonly name = 'ApiResponseError';
  readonly detail: ApiErrorDetail | undefined;

  constructor(request: FetchOptionsWithSession, response: FetchResult) {
    super('An error occurred while calling the API.', {level: 'warning'});
    this.request = request;
    this.response = response;
    this.detail = (response.data && typeof response.data === 'object' && 'error' in response.data) ? response.data.error as ApiErrorDetail : undefined;
  }
}

export interface ApiRequestErrorOptions {
  url: string | URL | Request;
  cause: unknown;
}

export class ApiRequestError extends BaseError {
  readonly name = 'ApiRequestError';
  readonly request: RequestInit;
  readonly options: ApiRequestErrorOptions;
  readonly stack: string | undefined;

  constructor(request: RequestInit, options: ApiRequestErrorOptions) {
    super(`${request?.method ?? 'GET'} ${options.url}`, {
      level: 'warning',
    });
    this.request = request;
    this.options = options;

    if (options.cause instanceof Error) {
      this.stack = options.cause.stack;
    }
  }
}

/**
 * API 호출이 성공했고, 응답값도 존재하지만,
 * 1. response.headers의 Content-Type 와
 * 2. ExtendedCustomFetchParameter의 dataType
 * 3. 실제 응답된 데이터
 * 이 3개가 서로 호환되지 않는 경우 이 에러가 발생함.
 *
 * Case
 * 1. Content-Type이 'application/json' 혹은 'text/plain'이 아니면서 && dataType을 manual로 지정하지 않은 경우 (클라이언트 개발자 잘못)
 * ==>
 * 이런 경우, 직접 'manual'로 지정하고, response.blob() 등으로 직접 응답 데이터를 가져와야함.
 *
 * 2. Content-Type 값이 'application/json' 인데 응답 데이터를 json으로 변환하다가 오류가 발생한 경우 (서버 개발자 잘못일 확률 높음)
 * ==>
 * 원인은, https://developer.mozilla.org/en-US/docs/Web/API/Response/json#exceptions에 명시됨.
 * 예시 > 서버에서 응답 헤더는 json이라고 했으면서 실제 데이터는 json으로 변환할 수 없는 데이터를 응답 한 경우
 *
 * 3. Content-Type 값이 'text/plain'인데, 응답 데이터를 text로 변환하다가 오류가 발생한 경우
 * ==>
 * 원인은, https://developer.mozilla.org/en-US/docs/Web/API/Response/text#exceptions에 명시됨.
 */
export class MismatchedApiResponseError extends BaseError {
  readonly request: FetchOptionsWithSession;
  readonly response: Pick<Response, 'status' | 'url'>;
  readonly name = 'MismatchedApiResponseError';

  constructor(request: FetchOptionsWithSession, response: Response) {
    super('Mismatch between response Content-Type, expected dataType, and actual response data.', {level: 'warning'});
    this.request = request;

    /**
     * 처음에는 여기에 text() 데이터라도 담으려고했는데, text()가 비동기 로직이어서 이 생성자 안에서 실행할 수가 없었음.
     * 이 에러 호출하는 밖에서 text()를 해서 이 안으로 전달하려고도 해봤지만, 당장 가치를 못느껴서 미루기로 헀음.
     */
    this.response = {
      url: response.url,
      status: response.status
    };
  }
}
