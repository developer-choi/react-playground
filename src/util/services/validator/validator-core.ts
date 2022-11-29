export interface ValidateParam {
  value: string;
}

export type ValidateResult<Reason = string, Result = string> = {
  validated: false;
  errorMessage: string;
  reason: Reason;
} | {
  validated: true;
  result: Result;
};

export type EmptyReason = 'EMPTY';

export function validateEmpty({value, prefix = '값을 '}: ValidateParam & { prefix?: string }): ValidateResult<EmptyReason> {
  const trimmedValue = value.trim();
  
  if (trimmedValue.length === 0) {
    return {
      validated: false,
      errorMessage: `${prefix}입력해주세요.`,
      reason: 'EMPTY'
    };
  }
  
  return {
    validated: true,
    result: trimmedValue
  };
}
