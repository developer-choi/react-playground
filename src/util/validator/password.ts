import type {ValidateParam, ValidateReasonResult, ValidateResult} from '@util/validator/validator-core';
import {validateEmpty} from '@util/validator/validator-core';

export const PASSWORD_LENGTH = {
  min: 10,
  max: 20
};

export function validatePassword({value}: ValidateParam): ValidateResult {
  const emptyResult = validateEmpty({value});
  
  if (!emptyResult.validated) {
    return emptyResult;
  }
  
  const trimmedValue = emptyResult.result;
  
  if (trimmedValue.length < PASSWORD_LENGTH.min || PASSWORD_LENGTH.max < trimmedValue.length) {
    return {
      validated: false,
      errorMessage: `비밀번호는 ${PASSWORD_LENGTH.min}자리 이상 ${PASSWORD_LENGTH.max}자리 미만이어야 합니다.`
    };
  }
  
  return {
    validated: true,
    result: trimmedValue
  };
}

export type ConfirmPasswordReason = 'INVALID_NEW_PASSWORD' | 'INVALID_CONFIRM_PASSWORD' | 'NOT_MATCH';
export type ValidateConfirmPasswordParam = Omit<ValidateParam, 'value'> & { newPassword: string, confirmPassword: string };

export function validateConfirmPassword({newPassword, confirmPassword}: ValidateConfirmPasswordParam): ValidateReasonResult<ConfirmPasswordReason> {
  const passwordResult = validatePassword({value: newPassword});
  
  if (!passwordResult.validated) {
    return {
      validated: false,
      reason: 'INVALID_NEW_PASSWORD',
      errorMessage: passwordResult.errorMessage
    };
  }
  
  const confirmPasswordResult = validatePassword({value: confirmPassword});
  
  if (!confirmPasswordResult.validated) {
    return {
      validated: false,
      reason: 'INVALID_CONFIRM_PASSWORD',
      errorMessage: confirmPasswordResult.errorMessage
    };
  }
  
  if (passwordResult.result !== confirmPasswordResult.result) {
    return {
      validated: false,
      reason: 'NOT_MATCH',
      errorMessage: '비밀번호가 서로 일치하지 않습니다.'
    };
  }
  
  return {
    validated: true,
    result: passwordResult.result
  };
}

export type OriginPasswordReason = ConfirmPasswordReason | 'INVALID_ORIGIN_PASSWORD';
export type ValidateOriginPasswordParam = ValidateConfirmPasswordParam & { originPassword: string; };
export interface OriginPasswordResult {
  originPassword: string;
  newPassword: string;
}

export function validateOriginPassword({newPassword, confirmPassword, originPassword}: ValidateOriginPasswordParam): ValidateReasonResult<OriginPasswordReason, OriginPasswordResult> {
  const originPasswordResult = validatePassword({value: originPassword});
  
  if (!originPasswordResult.validated) {
    return {
      validated: false,
      reason: 'INVALID_ORIGIN_PASSWORD',
      errorMessage: originPasswordResult.errorMessage
    };
  }
  
  const confirmPasswordResult = validateConfirmPassword({newPassword, confirmPassword});
  
  if (!confirmPasswordResult.validated) {
    return confirmPasswordResult;
  }
  
  return {
    validated: true,
    result: {
      originPassword: originPasswordResult.result,
      newPassword: confirmPasswordResult.result
    }
  };
}
