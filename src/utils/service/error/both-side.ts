import {Permission} from '@/utils/extend/permission';

export interface CustomizedErrorOption {
  cause: Error;
  sentry: {
    level: number;
    priority: 'high' | 'middle' | 'low';
  };
}

/**
 * 모든 커스텀 에러에 공통적으로 적용되야하는 설계를 반영
 */
export abstract class CustomizedError extends Error {
  readonly abstract name: string;
  readonly sentry: CustomizedErrorOption['sentry'] | undefined;
  // readonly platform: 'server' | 'client'; 공통적으로 적용하고싶은 로직이 있다면 적용

  protected constructor(message: string, option?: Partial<CustomizedErrorOption>) {
    const {cause, sentry} = option ?? {};
    super(message, {cause});
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

  constructor(message: string, config?: {title?: string, reason?: string}) {
    super(message);
    this.title = config?.title;
    this.reason = config?.reason;
  }
}

/**
 * Server Side에서 호출해야하는 에러인데, Client Side에서 호출했거나 또는 그 반대의 경우 발생되는 에러.
 * 대부분이 개발단계에서 진작에 해결된 상태로 빌드가 되야하는 에러들.
 */
export class InvalidEnvironmentError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * API를 호출할 때 권한이 필요한데,
 * 유저의 권한이 부족한 경우 발생.
 *
 * API를 호출하기 직전에 체크해서 throw 될 수도 있고,
 * API에서 403이 응답된 경우에도 이 에러로 감싸짐.
 */
export class ServicePermissionDeniedError extends CustomizedError {
  readonly name = 'ServicePermissionDeniedError';
  readonly request: Permission | undefined;
  readonly granted: Permission[];

  constructor(request: Permission | undefined, granted: Permission[]) {
    super(`Requested = ${request}\nGranted = ${granted.join(', ')}`);
    this.request = request;
    this.granted = granted;
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
