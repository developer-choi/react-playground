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
}

/**
 * 모든 커스텀 에러에 공통적으로 적용되야하는 설계를 반영
 */
export abstract class CustomizedError extends Error {
  readonly abstract name: string; // 반드시 overriding 해야하고, 이후 수정 못하게 설정
  readonly sentry: Partial<SentryOption> | undefined;
  // readonly platform: 'server' | 'client'; 공통적으로 저장하고 싶은 데이터가 있다면 추가

  protected constructor(message: string, option?: Partial<CustomizedErrorOption>) {
    const {cause, ...sentry} = option ?? {};
    super(message, {cause});
    this.sentry = sentry;
    // this.platform = isServer() ? 'server' : 'client';
  }
}

export interface ValidationErrorOptions<T extends string> {
  /**
   * 목적: 에러가 발생한 폼 요소를 구분할 수 있는 값.
   * - 주로 react-hook-form의 register()로 전달하는 name값을 location에 전달하는 경우가 많습니다.
   */
  location?: T;

  /**
   * 에러가 발생한 당시 폼 데이터 전체 혹은 일부.
   * 혹은 함수로 전달된 매개변수.
   * 필요 시 전달 (Sentry로 보내서 원인 파악을 위함)
   */
  data: object;

  /**
   * @description 빌드 결과물에서 (운영서버) 함수 실행하다 오류가 발생했을 때 그 함수 이름
   * 빌드하면 함수이름들 다 난도화되서 못알아봐서 넣으려고 했음.
   * 근데 에러메시지로 검색하면 어디서 발생했는지 알 수 있으니까 안넣기로 결정헀음
   */
  // functionName: string;
}

export class ValidationError<L extends string = string> extends CustomizedError {
  readonly options: ValidationErrorOptions<L>;
  readonly name = 'ValidationError';

  constructor(message: string, options: ValidationErrorOptions<L>) {
    super(message);
    this.options = options;
  }
}

// API에서 에러가 발생한 경우, 별도로 응답되는 에러 데이터. 있을 수도, 없을 수도 있음. (500에러, 404에러 등은 이런 데이터가 없음), 주로 POST / UPDATE에서 유효성검증 하다 실패했을 때 주로 사용함.
export interface CustomizedApiErrorInfo {
  type: string;
  message: string;
  params: any;
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
