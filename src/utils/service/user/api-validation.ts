import {useEffect, useState} from 'react';
import type {FieldError, FieldPath, FieldValues, Path, PathValue, UseFormReturn} from 'react-hook-form';
import {
  getUserFieldCountApi,
  UserFieldCountApiResponse,
  UserFieldCountApiRequest
} from '@/utils/service/api/user';

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
  const inputError = formState.errors[fieldName] as FieldError | undefined;

  const [state, setState] = useState<ApiState>({
    isFetching: false,
    data: undefined,
  });

  useEffect(() => {
    if (state.isFetching) {
      clearErrors(fieldName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isFetching]);

  useEffect(() => {
    if (!state.data) {
      return;
    }

    const processedInputError = determinePriorityErrorMessage({
      inputValue,
      apiConfig: {
        validationMode,
        type
      },
      state
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
    if (state.data.validated || initialValue === inputValue) {
      setValue(validationFieldName, inputValue as PathValue<T, Path<T>>);
      clearErrors(fieldName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data]);

  /**
   * 단 주의 할 점은, 아래 상황에서 중복검사 API가 호출되면 안됨
   * 1. 최초 렌더링시점 (수정페이지 진입했는데 닉네임 이미 존재한다고 뜨면 말이안됨. 당연하지 내가 쓰고있으니까)
   * 2. 빈문자열을 포함해서 클라이언트 유효성검증을 통과하지 못한경우
   * - (단, API 요청도 안했는데 바로 제출때려버린 경우는 예외로 API 호출 그대로 진행되야)
   * 3. 현재 내 닉네임과 동일한 경우 (홍길동에서 님 추가했다가 다시 님 삭제한 경우 홍길동과 동일해서 이 때 호출되면 안됨) ==> 이 경우 즉시 성공으로 판단해야.
   */
  useEffect(() => {
    const isFormError = determineFormError(inputError?.type);

    if (!inputValue || isFormError || initialValue === inputValue) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setState({
        data: undefined,
        isFetching: true
      });
      
      getUserFieldCountApi({
        type,
        value: inputValue,
        validationMode,
        onlyActiveUser
      }).then(result => {
        setState({
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

        // 기존 다른 inputError가 있으면 덮어쓰지않기위함
        setError(fieldName, inputError ? inputError : fetchingError);

        return fetchingError.message;
      }
    }
  });

  const isSuccess = !!state.data?.validated;
  return {
    errorMessage: inputError?.message,
    isSuccess,
    isFetching: state.isFetching,
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
  }
}
