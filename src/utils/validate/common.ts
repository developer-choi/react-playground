/**
 * 입력 / 제출시 뭔가 잘못된 경우 에러메시지를 바꾸고싶을 때 사용하는 property 입니다.
 * 혹은, 기본적으로 제공되는 에러메시지를 구분할 때 사용하는 property 입니다.
 */
export interface EmptyErrorMessageConfig {
  whenEmpty?: string;
}

export interface NumberErrorMessageConfig extends EmptyErrorMessageConfig {
  notNumber?: string;
}

export const ERROR_MESSAGE: Record<keyof NumberErrorMessageConfig, string> = {
  whenEmpty: '값을 입력해주세요.',
  notNumber: '숫자만 입력이 가능합니다.'
};

/**
 * onSubmit할 때는 일반적으로 사용자가 입력했던 값을 바꾸지 않습니다. 입력값이 잘못되면 에러메시지로 표현합니다.
 * 그래서 value property는 OnChange interface에만 존재해야합니다.
 */
export interface OnSubmitValidateResult {

  /**
   * 유효성 검증을 통과한 여부를 나타냅니다.
   * 활용1. onChange(입력시) 에서 true일 경우, submit버튼을 활성화하거나, 입력박스가 조건을 통과했다는 의미로 초록색 테두리 표시한다거나 할 떄 쓸 수 있습니다.
   * 활용2. onSubmitEditing(입력박스에서 키보드 엔터), onSubmit(폼 제출) 에서, 잘못됬을 경우 포커스를 주거나, 포커스를 취소하는데 사용할 수 있습니다.
   */
  validated: boolean;

  /**
   * 에러메시지는 비어있거나 혹은 존재할 수 있습니다.
   * 에러문자열이 비어있지 않으면(= 존재하면), 에러메시지 혹은 입력박스의 테두리를 빨간색으로 표시한다거나 하는 에러효과를 나타낼 떄 응용합니다.
   * 에러문자열이 비어있다면 에러효과를 지우고 원상태로 표기하는데 사용됩니다.
   *
   * 나타나는 에러 효과가 없다고 해서, 반드시 유효성검증이 통과됬다는 것을 의미하지는 않습니다.
   * 입력하는 도중에(onChange) 입력값을 지워서 입력박스에 아무것도 없는 경우, 에러메시지를 표시하지 않을 뿐 유효하지는 않습니다.
   */
  errorMessage: string;
}

/**
 * 사용자가 값을 입력하던 와중에 그 값이 잘못되면, 올바른값으로 정정하기 위한 작업이 필요할 수 있습니다.
 * 그러므로 value property가 interface에 필요합니다.
 */
export interface OnChangeValidateResult extends OnSubmitValidateResult {

  /**
   * 사용자가 입력한 값을 나타냅니다.
   * 일반적으로 사용자가 입력한 값과 동일하지만,
   * 입력될 수 있는 값의 종류가 제한된 경우, (ex : 숫자만) 입력한 값과 이 값이 다를 수 있습니다.
   */
  value: string;
}

export type OnChangeValidatorType = (value: string) => OnChangeValidateResult;
export type OnSubmitValidatorType = (value: string) => OnSubmitValidateResult;

export const VALIDATE_SUCCESS_RESULT: OnSubmitValidateResult = {
  errorMessage: '',
  validated: true
};

export function onChangeValidateWhenEmpty(value: string, validator?: OnChangeValidatorType): OnChangeValidateResult {

  if (value.length === 0) {

    return {
      value,
      errorMessage: '',
      validated: false
    };

  } else if (validator !== undefined) {

    return validator(value);

  } else {

    return {
      value,
      ...VALIDATE_SUCCESS_RESULT
    };
  }
}

export function onSubmitValidateWhenEmpty(value: string, validator?: OnSubmitValidatorType, config?: EmptyErrorMessageConfig): OnSubmitValidateResult {

  if (value.length === 0) {

    return {
      errorMessage: config?.whenEmpty ?? ERROR_MESSAGE.whenEmpty,
      validated: false
    };

  } else if (validator !== undefined) {

    return validator(value);

  } else {

    return VALIDATE_SUCCESS_RESULT;
  }
}
