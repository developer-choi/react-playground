import {CustomizedError} from '@forworkchoe/core/utils';

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
