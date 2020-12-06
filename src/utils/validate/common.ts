/**
 * 잘못됬거나, 잘됬거나 했을 때 메시지를 표기하기 위한 property입니다.
 * 아래의 경우는, 빈 문자열일 경우에 대해 에러메시지를 뜻하는 property입니다.
 */
export interface EmptyMessageConfig {
  emptyError: string;
}

export const EMPTY_ERROR_MESSAGE_CONFIG: Record<keyof EmptyMessageConfig, string> = {
  emptyError: '값을 입력해주세요.',
};

export interface ValidateResult {

  /**
   * 유효성 검증을 통과한 여부를 나타냅니다.
   * 활용1. onChange(입력시) 에서 true일 경우, submit버튼을 활성화하거나, 입력박스가 조건을 통과했다는 의미로 초록색 테두리 표시한다거나 할 떄 쓸 수 있습니다.
   * 활용2. onEnter(입력박스에서 키보드 엔터), onSubmit(폼 제출) 에서, 잘못됬을 경우 포커스를 주거나, 포커스를 취소하는데 사용할 수 있습니다.
   */
  validated: boolean;

  /**
   * validated가 true일 경우 message는 성공메시지를 의미할 수 있고,
   * validated가 false일 경우 message는 에러메시지를 의미할 수 있습니다.
   */
  message: string;
}

export const VALIDATE_SUCCESS_RESULT: ValidateResult = {
  message: '',
  validated: true
};

export function onEnterValidateWhenEmpty(value: string, config: EmptyMessageConfig = EMPTY_ERROR_MESSAGE_CONFIG): ValidateResult {

  if (value.length === 0) {
    return {
      message: config?.emptyError,
      validated: false
    };
  }

  return VALIDATE_SUCCESS_RESULT;
}

/**********************************************
 * 활용예시
**********************************************/

/**
 * 주로 실패메시지를 쓸 때 이 Config를 많이 응용하겠지만,
 * 성공메시지를 쓸 때도 사용이 가능할 수 있습니다.
 */
export interface WalletNameUpMessageConfig extends EmptyMessageConfig {
  verifiedName: string;
  symbolError: string;
}

export function onEnterValidateWhenEmailForSignUp(value: string, config?: WalletNameUpMessageConfig) {

  const emptyResult = onEnterValidateWhenEmpty(value, config);
  if (!emptyResult.validated) {
    return emptyResult;
  }

  if (true) {
    return {
      validated: true,
      message: config?.verifiedName ?? '사용 가능한 지갑이름입니다.'
    };

  } else {
    return {
      validated: false,
      message: config?.symbolError ?? '지갑이름에 특수문자가 있으면 안됩니다.'
    };
  }
}
