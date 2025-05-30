import {CustomizedError} from '@/utils/service/error/class/index';

// 회원가입 폼 페이지 안거치고 회원가입 완료페이지 간 경우
export class InvalidAccessError extends CustomizedError {
  readonly name = 'InvalidAccessError';

  constructor(message = '잘못된 접근입니다.') {
    super(message);
  }
}
