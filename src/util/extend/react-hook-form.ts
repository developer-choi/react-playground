import type {FieldError} from 'react-hook-form/dist/types/errors';
import type {RegisterOptions, ValidationValueMessage} from 'react-hook-form/dist/types/validator';

export function baseHandleErrors(errorList: (FieldError | undefined)[]) {
  for (const error of errorList) {
    if (!error) {
      continue;
    }

    const {message} = error;

    if (!message) {
      throw new TypeError('error message를 지정안했음. register중에 ValidationValueMessage 타입으로 쓰지않은 값이 있는지 확인');
    }

    alert(message);

    error.ref?.focus?.();
    break;
  }
}

/**
 * @return undefuned = 애초에 지정안했으니 기본값 쓰면된다는 뜻
 */
export function getRequiredOptions(required: RegisterOptions['required']): ValidationValueMessage<boolean> | undefined {
  if (required === undefined) {
    return undefined
  }

  if(typeof required === 'object') {
    return required
  }

  if (required === true) {
    return {
      value: true,
      message: '필수입니다.'
    }
  }

  if (required === false) {
    return {
      value: false,
      message: ''
    }
  }

  // typeof required === 'string'
  return {
    value: true,
    message: required
  };
}
