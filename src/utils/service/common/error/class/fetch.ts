import {FetchOptionsWithSession, FetchResult} from '@/utils/extend/library/fetch/base';
import {CustomizedApiErrorInfo} from '@/utils/service/common/error/class/index';
import {CustomizedError} from '@forworkchoe/core/utils';

/**
 * API 호출이 성공했고, 응답값도 존재하지만, 2xx가 아닌 경우 발생함. (response.ok가 false)
 * 즉, API 호출조차도 실패한 케이스는 이 에러가 던져지지 않음. (Type Error 'Failed to fetch' 같은 케이스)
 * 단, 일부 에러코드는 별도의 에러클래스가 던져짐 (401)
 */
export class FetchError extends CustomizedError {
  readonly request: FetchOptionsWithSession;
  readonly response: FetchResult;
  readonly name = 'FetchError';
  readonly apiErrorInfo: CustomizedApiErrorInfo | undefined;

  constructor(request: FetchOptionsWithSession, response: FetchResult, apiErrorInfo: CustomizedApiErrorInfo | undefined) {
    super('An error occurred while calling the API.');
    this.request = request;
    this.response = response;
    this.apiErrorInfo = apiErrorInfo;
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
export class MismatchedApiResponseError extends CustomizedError {
  readonly request: FetchOptionsWithSession;
  readonly response: Pick<Response, 'status' | 'url'>;
  readonly name = 'MismatchedApiResponseError';

  constructor(request: FetchOptionsWithSession, response: Response) {
    super('Mismatch between response Content-Type, expected dataType, and actual response data.');
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
