export interface ValidatorParam {
  /**
   * 내가 Validator를 사용하는 경우는
   * <input>이랑 <textarea>에 입력된 값을 유효성검증할 때 밖에 없다.
   *
   * 그래서 과거 교훈에 의해 이 두 태그에 전달되는 value props type은 string으로 고정하기로 했었고,
   * 그래서 ValidatorParam과 ValidatorResult 모두 value, result의 타입이 string이다.
   */
  value: string;
}

export interface ValidatorResult {
  /**
   * validated가 true이면 result가 있고 errorMessage가 없다.
   *
   * validated가 false이면 result가 없고 errorMessage는 없을 수도, 있을수도 있다.
   * ==>
   * errorMessage가 없다고 해서 validated가 반드시 true는 아니다.
   * 그래서 폼을 제출해도 되는지를 체크할때는 errorMessage가 아니라 validated로 체크해야한다.
   */
  result?: string;
  errorMessage?: string;
  
  validated: boolean;
}

/**
 */
export function validateEmpty({value, prefix = '값을 '}: ValidatorParam & { prefix?: string }): ValidatorResult {
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
