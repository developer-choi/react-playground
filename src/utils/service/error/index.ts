import {CustomResponse} from '@/utils/extend/library/fetch';
import type {SeverityLevel} from '@sentry/types';

// export type SentryTag = 'some';
export interface SentryOption {
  level: SeverityLevel;

  /**
   * sentry로 보내지 않기 위한 설정.
   * 애초에 Sentry로 가지않게 던지는 곳에서 조건 따져서 throw 하면 되는 아니냐 라는 생각이 아직 있기 때문에, 검토만 하는중
   */
  // ignore: boolean;
  // readonly tag: SentryTag 다른사람들 태그 활용법 찾아보고, 마땅한게 없으면 난 태그를 여기에 추가할 계획임. 그러고나서 beforesend에 추가.
  // readonly sendAlert: 'email' | 'slack; 이런 옵션도 좋을거같고, 있으면 tag에 추가하고 그 tag를 sentry에서 설정을 해두는거지.
}

export interface CustomizedErrorOption extends SentryOption {
  cause: Error;
  meta?: object;
}

/**
 * 모든 커스텀 에러에 공통적으로 적용되야하는 설계를 반영
 */
export abstract class CustomizedError extends Error {
  readonly abstract name: string; // 반드시 overriding 해야하고, 이후 수정 못하게 설정
  readonly sentry: Partial<SentryOption> | undefined;
  readonly meta: object | undefined;
  // readonly platform: 'server' | 'client'; 공통적으로 저장하고 싶은 데이터가 있다면 추가

  protected constructor(message: string, option?: Partial<CustomizedErrorOption>) {
    const {cause, meta, ...sentry} = option ?? {};
    super(message, {cause});
    this.meta = meta;
    this.sentry = sentry;
    // this.platform = isServer() ? 'server' : 'client';
  }
}

/**
 * 공통: 런타임 에러
 * 1. 다양한 query-string이 있는 웹페이지에서 URL로 부터 query-string 유효성검증 하다가 잘못된 값이 있을 때
 * 2. 사용자의 입력을 받으려고하는데 잘못된 형식일 때 (ex: '업로드 가능한 확장자는 jpg png 입니다)
 * 3. 사용자에게 입력을 받아서 서버에 제츨했더니 잘못된 입력값이 있다는 응답이 왔을 때 (ex: 비밀번호가 틀렸다)
 *
 * title: 에러메시지의 주제를 나타냄.
 * API를 호출하기 전 / 후에 에러가 발생해서 내용을 팝업의 형태로 보여주려고 할 때,
 * 팝업에 내용과 제목이 둘 다 있는경우 내용은 error.message로 보여주고 제목은 error.title로 보여주려고 할 때 사용하려고 추가.
 *
 * reason: 구체적으로 에러의 원인을 나타낼 때 사용함.
 * ex: 로그인 API를 호출하기전에 유효성검증하다가 ValidateError가 발생했고, reason에 'email'로 나와있다면, 이메일 값이 문제가 있음을 나타냄.
 * 그래서 reason === 'email'이면 이메일 입력박스에 포커스를 준다거나 하는 방식으로 응용하기 위해 추가.
 */
export class ValidateError extends CustomizedError {
  readonly title?: string;
  readonly reason?: string;
  readonly name = 'ValidateError';

  constructor(message: string, config?: {title?: string, reason?: string} & Pick<CustomizedError, 'meta'>) {
    super(message, {meta: config?.meta});
    this.title = config?.title;
    this.reason = config?.reason;
  }
}

// API에서 에러가 발생한 경우, 별도로 응답되는 에러 데이터. 있을 수도, 없을 수도 있음. (500에러, 404에러 등은 이런 데이터가 없음), 주로 POST / UPDATE에서 유효성검증 하다 실패했을 때 주로 사용함.
export interface CustomizedApiErrorInfo {
  type: string;
  message: string;
}

/**
 * fetch() 호출 자체는 성공했으나, response.ok가 true가 아닌 모든 케이스.
 * 예를들어 fetch() 호출 자체가 Type Error 'Failed to fetch' 같은 케이스는 이 에러로 감싸지지않음.
 * 단, 401 / 403은 예외로, 이 에러 다신 별도의 커스텀 에러가 던져짐.
 */
export class FetchError extends CustomizedError {
  readonly response: CustomResponse;
  readonly name = 'FetchError';
  readonly apiErrorInfo: CustomizedApiErrorInfo | undefined;

  constructor(response: CustomResponse, apiErrorInfo: CustomizedApiErrorInfo | undefined) {
    super('An error occurred while calling the API.');
    this.response = response;
    this.apiErrorInfo = apiErrorInfo;
  }
}

export class LoginError extends CustomizedError {
  readonly name = 'LoginError';
  readonly loginUrlWithRedirect: string; // 로그인페이지 URL에 리다이랙트 URL까지 포함된 값 ex: /guest/login?redirect=...

  constructor(message: string, loginUrlWithRedirect = '/') {
    super(message);
    this.loginUrlWithRedirect = loginUrlWithRedirect;
  }
}

/**
 * 개발자가 프로젝트에서 정한 코드관련 정책을 지키지 않은 경우 발생함.
 *
 * 1. client side에서만 호출되기를 기대하고 작성한 함수를 server side에서 호출했거나
 * 2. 1 | 2 | 3 등 자연수만 전달되기를 기대하고 작성한 함수에 소수점같은 값을 전달한다거나,
 */
export class InvalidDevelopPolicyError extends CustomizedError {
  readonly name = 'InvalidDevelopPolicyError';
  readonly data: any | undefined;

  constructor(message: string, data?: any) {
    super(message);
    this.data = data;
  }
}

/**
 * 로그인이 되어있는 상태에서
 * 로그인이 안되야만 가능한 액션을 했을 때 발생하는 에러.
 */
export class GuestError extends CustomizedError {
  readonly name = 'GuestError';
  constructor(message = '이미 로그인이 되어있어서 해당 동작을 실행할 수 없습니다.') {
    super(message);
  }
}
