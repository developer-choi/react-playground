export interface ValidateParam {
  /**
   * 내가 Validator를 사용하는 경우는
   * <input>이랑 <textarea>에 입력된 값을 유효성검증할 때 밖에 없다.
   *
   * 그래서 과거 교훈에 의해 이 두 태그에 전달되는 value props type은 string으로 고정하기로 했었고,
   * 그래서 ValidatorParam과 ValidatorResult 모두 value, result의 타입이 string이다.
   */
  value: string;
}

export type ValidateResult<R = string> = {
  validated: false;
  errorMessage: string;
} | {
  validated: true;
  result: R;
};

export type ValidateReasonResult<Rea = string, Res = string> = {
  validated: false;
  errorMessage: string;
  reason: Rea;
} | {
  validated: true;
  result: Res;
};

export function validateEmpty({value, prefix = '값을 '}: ValidateParam & { prefix?: string }): ValidateResult {
  const trimmedValue = value.trim();
  
  if (trimmedValue.length === 0) {
    return {
      validated: false,
      errorMessage: `${prefix}입력해주세요.`
    };
  }
  
  return {
    validated: true,
    result: trimmedValue
  };
}
