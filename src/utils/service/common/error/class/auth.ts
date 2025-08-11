import {CustomizedError} from '@/utils/service/common/error/class/index';

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

export class LoginError extends CustomizedError {
  readonly name = 'LoginError';
  readonly loginUrlWithRedirect: string; // 로그인페이지 URL에 리다이랙트 URL까지 포함된 값 ex: /guest/login?redirect=...

  constructor(message: string, loginUrlWithRedirect = '/') {
    super(message);
    this.loginUrlWithRedirect = loginUrlWithRedirect;
  }
}
