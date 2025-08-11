import {useEffect, useState} from 'react';
import type {FieldError, FieldPath, FieldValues, Path, PathValue, UseFormReturn} from 'react-hook-form';
import {
  getUserFieldCountApi,
  UserFieldCountApiResponse,
  UserFieldCountApiRequest
} from '@/utils/service/common/api/user';

export interface ValidateUserInputParams<T extends FieldValues> {
  form: {
    methods: UseFormReturn<T>;
    fieldName: FieldPath<T>;
    validationFieldName: FieldPath<T>;
    /**
     * 회원가입 폼에서는 값이 없고,
     * 내정보 수정 폼에서는 값이 있어야함.
     * truthy 한 값을 전달할 경우, 현재 폼 값이 originalValue와 동일한 경우 중복검사 API를 호출하지않음.
     */
    initialValue?: string;
  };
  apiConfig: Pick<UserFieldCountApiRequest, 'type' | 'validationMode' | 'onlyActiveUser'>;
}

/**
 * 회원정보 인풋중에, onChange 시점에 API 를 통해 유효성검증을 하는 경우 이 hooks를 사용.
 * (이미 존재하는 닉네임입니다) 이런거 하기위해
 * 숨은 출력으로 setError()를 함. 그래서 formState.error로 에러메시지 똑같이 가져오면됨
 */
export function useUserFieldApiValidation<T extends FieldValues>(params: ValidateUserInputParams<T>) {
  const {
    form: {
      methods: {
        setValue,
        formState,
        watch,
        register,
        setError,
        clearErrors
      },
      fieldName,
      validationFieldName,
      initialValue
    },
    apiConfig: {
      validationMode,
      type,
      onlyActiveUser
    }
  } = params;

  const inputValue: PathValue<T, Path<T>> | undefined = watch(fieldName); // 기본값 선언 안했으면 undefined 될 수 있음.

  /**
   * https://docs.google.com/document/d/1vw2jTuSqu0zNME8pwyArMFL6Dl5VvkCfD4Xfw0N4VUQ/edit#heading=h.cp46jness9ty > [Error Message Priority] 참고
   * 기본적으로 클라이언트 유효성검증에서 실패했을 때 에러도 포함하지만,
   * API 호출했는데 응답이 에러인 경우 setError()를 통해 에러메시지를 직접 셋팅하여
   * 결과적으로 이 에러값만 참조할 수 있도록 의도하였음.
   *
   * 일부러 하단 determinePriorityErrorMessage() 리턴값을 직접 이 hooks에서 리턴하지않고
   * 그 리턴값을 이 error로 setError() 해서 이 리턴값 하나만 반환했음.
   *
   * 아래에서 어떤 로직을 작성하더라도,
   * 1. (클라이언트) 유효성검증에서 실패한 경우, 반드시 그 에러메시지가 여기에 저장되야함.
   * 2. (클라이언트) 유효성검증에서 실패한 상태에서 API 에러메시지가 여기에 저장되면 안됨.
   * ==>
   * API 에러메시지가 셋팅되는 케이스는 반드시 클라이언트 유효성검증은 통과한 케이스여야함
   *
   * use[Some]Input() 에서 설정한 Client Side 유효성검증 규칙에 기반한 에러메시지는 이 hooks에서 전혀 신경쓰지않음.
   * 아무튼 클라이언트에서 유효성검증하다 실패했냐 안했냐가 중요할뿐.
   */
  const inputError = formState.errors[fieldName] as FieldError | undefined;

  // 예전엔 이게 react-query로 관리됐는데 캐싱할 근거가 없어져서 state로 관리중
  const [apiState, setApiState] = useState<ApiState>({
    isFetching: false,
    data: undefined,
  });

  /**
   * 에러 초기화시점을 onChange가 아닌, fetching 시점으로 잡았음.
   * https://docs.google.com/document/d/1vw2jTuSqu0zNME8pwyArMFL6Dl5VvkCfD4Xfw0N4VUQ/edit#heading=h.cp46jness9ty
   */
  useEffect(() => {
    if (apiState.isFetching) {
      clearErrors(fieldName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.isFetching]);

  useEffect(() => {
    if (!apiState.data) {
      return;
    }

    const processedInputError = determinePriorityErrorMessage({
      inputValue,
      apiConfig: {
        validationMode,
        type
      },
      state: apiState
    });

    if (processedInputError !== undefined) {
      setError(fieldName, {
        type: processedInputError.type,
        message: processedInputError.message
      });
      return;
    }

    /**
     * Case 1. 기존 유저의 필드값과 같은 경우
     * Case 2. API를 통해 유효한걸로 판단된 경우
     */
    if (apiState.data.validated || initialValue === inputValue) {
      setValue(validationFieldName, inputValue as PathValue<T, Path<T>>);
      clearErrors(fieldName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiState.data]);

  /**
   * 단 주의 할 점은, 아래 상황에서 중복검사 API가 호출되면 안됨
   * 1. 최초 렌더링시점 (수정페이지 진입했는데 닉네임 이미 존재한다고 뜨면 말이안됨. 당연하지 내가 쓰고있으니까)
   * 2. 빈 문자열을 포함해서 클라이언트 유효성검증을 통과하지 못한경우
   * - 단, API 요청도 안했는데 바로 제출때려버린 경우는 예외로 API 호출 그대로 진행되야
   * 3. 현재 내 닉네임과 동일한 경우 (홍길동에서 님 추가했다가 다시 님 삭제한 경우 홍길동과 동일해서 이 때 호출되면 안됨) ==> 이 경우 다시 성공으로 판단해야.
   */
  useEffect(() => {
    const isFormError = determineFormError(inputError?.type);

    if (!inputValue || isFormError || initialValue === inputValue) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setApiState({
        data: undefined,
        isFetching: true
      });
      
      getUserFieldCountApi({
        type,
        value: inputValue,
        validationMode,
        onlyActiveUser
      }).then(result => {
        setApiState({
          data: result,
          isFetching: false
        });
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const hiddenInputProps = register(validationFieldName, {
    // API에서 유효성검증도 안했는데 제출된 경우 API 호출 블로킹하고 에러메시지를 노출하기 위함.
    validate: {
      required: value => {
        const validated = value === inputValue;

        if (validated) {
          return true;
        }

        const fetchingError: InputFieldError = {
          type: 'fetching',
          message: `${FIELD_TYPE_LABELS[type]}이(가) 중복인지 확인해주세요.`
        };

        /**
         * 기존 다른 inputError가 있으면 덮어쓰지않기위함.
         * inputError가 있는 경우는, Client Side에서 해당 인풋으로 유효성검증하다가 에러가 난 경우 (syntax 등)밖에 없음.
         */
        if (!inputError) {
          setError(fieldName, fetchingError);
        }

        return fetchingError.message;
      }
    }
  });

  // 닉네임인풋 우측에 성공이라는 체크표시 보여줄 때 사용
  const isSuccess = !!apiState.data?.validated;

  return {
    isSuccess,
    isFetching: apiState.isFetching,
    hiddenInputProps
  };
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
interface InputFieldError {
  type: FieldError['type'] | 'fetching' | 'api'; // api 타입은, API 응답결과에 의해 에러가 발생한 경우를 뜻함. (4xx 5xx 혹은 이미 존재하거나 존재하지않거나)
  message: string;
}

function determineFormError(errorType: InputFieldError['type'] | undefined): boolean {
  switch (errorType) {
    case 'api':
    case 'fetching':
    case undefined:
      return false;

    default:
      return true;
  }
}

const FIELD_TYPE_LABELS: Record<UserFieldCountApiRequest['type'], string> = {
  nick_name: '닉네임',
  email: '이메일'
};

interface ApiState {
  isFetching: boolean;
  data: undefined | UserFieldCountApiResponse;
}

interface PriorityErrorMessageParams {
  inputValue: string | undefined; // watch('someKey')
  state: ApiState;
  apiConfig: Pick<UserFieldCountApiRequest, 'type' | 'validationMode'>;
}

/**
 * https://docs.google.com/document/d/1vw2jTuSqu0zNME8pwyArMFL6Dl5VvkCfD4Xfw0N4VUQ/edit
 *
 * 오직, API Error 메시지만 우선순위를 결정함.
 * 1순위 > API에서 예상못한 에러메시지가 온 경우 (4xx 5xx, etc) 그거 노출
 * 2순위 > API에서 예상된 에러응답이 온 경우 (count가 0이어야 정상인데 1왔거나) > '이미 존재하는 닉네임입니다'
 */
function determinePriorityErrorMessage(params: PriorityErrorMessageParams): undefined | InputFieldError {
  const {inputValue, state, apiConfig} = params;

  if (!inputValue?.length || state.isFetching || !state.data || state.data.validated) {
    return undefined;
  }

  if (state.data.errorMessage) {
    return {
      type: 'api',
      message: state.data.errorMessage
    };
  }

  const label = FIELD_TYPE_LABELS[apiConfig.type];

  return {
    type: 'api',
    message: apiConfig.validationMode === 'does-not-exist' ? `이미 존재하는 ${label}입니다.` : `존재하지 않는 ${label}입니다.`,
  };
}
