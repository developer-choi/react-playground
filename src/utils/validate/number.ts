import {
  ERROR_MESSAGE,
  NumberErrorMessageConfig,
  OnChangeValidateResult,
  onChangeValidateWhenEmpty,
  OnChangeValidatorType, OnSubmitValidateResult, onSubmitValidateWhenEmpty,
  OnSubmitValidatorType, VALIDATE_SUCCESS_RESULT
} from './common';
import {Decimal} from 'decimal.js';

/**
 * 입력박스가, 숫자만 입력이 가능한 경우에 대한 함수입니다.
 * 단, 주민번호처럼 숫자연산이 가능한 숫자 값을 의미하지는 않습니다.
 * 숫자연산이 가능한 숫자만 입력을 원하는 경우, onChangeValidateMeanNumberValue()를 사용해주세요.
 */
export function onChangeValidateOnlyNumber(value: string, validator?: OnChangeValidatorType): OnChangeValidateResult {

  return onChangeValidateWhenEmpty(value, (_value) => {

    if (Number.isNaN(Number(_value))) {

      const parseIntResult = parseInt(_value);

      /**
       * 빈 문자열이거나, 첫글자 부터가 숫자가 아닌경우.
       */
      if (Number.isNaN(parseIntResult)) {

        return {
          value: '',
          errorMessage: '',
          validated: false
        };

      } else {
        return {
          value: String(parseIntResult),
          errorMessage: '',
          validated: false
        };
      }

    } else if (validator !== undefined) {

      return validator(_value);

    } else {

      return {
        value: _value.replace(/\./gi, ''),
        errorMessage: '',
        validated: true
      };
    }
  });
}

export function onSubmitValidateOnlyNumber(value: string, validator?: OnSubmitValidatorType, config?: NumberErrorMessageConfig): OnSubmitValidateResult {

  return onSubmitValidateWhenEmpty(value, (_value) => {

    if (Number.isNaN(_value)) {

      return {
        validated: false,
        errorMessage: config?.notNumber ?? ERROR_MESSAGE.notNumber
      };

    } else if (validator !== undefined) {

      return validator(_value);

    } else {

      return VALIDATE_SUCCESS_RESULT;
    }

  }, config);
}

/**
 * 입력박스가, 숫자 연산이 가능한 숫자(정수만. 소수아님)를 입력받는 경우에 대한 함수입니다.
 *
 * 단, 주민번호처럼 숫자연산이 불가능하지만 숫자만 입력이 가능한 경우에는
 * onChangeValidateOnlyNumber()를 사용해주세요.
 *
 * ex: '0123' 이라고 입력한 경우, '123' 이라고 정정합니다.
 * ex: '123.012345' 이라고 입력한 경우, '123' 이라고 정정합니다.
 */
export function onChangeValidateMeanIntegerValue(value: string, validator?: OnChangeValidatorType): OnChangeValidateResult {

  const validatedResult = onChangeValidateOnlyNumber(value, validator);
  const resultValue = validatedResult.value === '' ? '' : String(Number(validatedResult.value));

  return {
    ...validatedResult,
    value: resultValue
  };
}

export function decimalSlice(value: number, decimalLength: number) {
  const numerator  = Decimal.mul(value, (10 ** decimalLength)).floor().toNumber();
  const denominator = 10 ** decimalLength;
  return Decimal.div(numerator, denominator).toNumber();
}
