import {FieldError, RegisterOptions, ValidationValueMessage} from 'react-hook-form';

/**
 * 가장 큰 목적은, 폼 제출했을 때 여러개의 에러가 동시에 발생한 경우
 * 개발자가 원하는 순서대로 에러를 사용자에게 피드백 하기 위함.
 */
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
 * 이게 필요한 용도는, options > validate() 안에서밖에 없습니다.
 * 단순히 required 옵션만 커스텀하고싶은경우, 복잡하게 이 함수를 호출하지않고 기본값을 지정하는것이 더 간단합니다.
 * 예시)
 * return {
 *   required: required (param) ?? {
 *     value: true,
 *     message: '대충이래서 필수라는 메시지'
 *   }
 * }
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

export function validateTrim(errorMessage: string, required = true) {
  return (value: string) => {
    if (value === '' && !required) {
      return true;
    } else if (value.trim()) {
      return true;
    } else {
      return errorMessage;
    }
  };
}
