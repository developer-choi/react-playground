import {FieldError} from 'react-hook-form';

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

export function validateRequiredWithTrim(errorMessage: string, required = true) {
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

export function validateMinLengthWithTrim(minLength: number, errorMessage: string) {
  return (value: string) => {
    if (value.trim().length >= minLength) {
      return true;
    } else {
      return errorMessage;
    }
  };
}
