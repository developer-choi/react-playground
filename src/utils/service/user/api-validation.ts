import {useEffect} from 'react';
import type {FieldPath, FieldValues, Path, PathValue, UseFormReturn} from 'react-hook-form';
import {getUserFieldCountApi, UserFieldCountApiRequest, ProcessedUserFieldCountApiResponse} from '@/utils/service/api/user';
import {useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';

interface ValidateUserInputParams<T extends FieldValues> {
  form: {
    methods: Pick<UseFormReturn<T>, 'setValue' | 'watch' | 'formState'>;
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
        watch
      },
      fieldName,
      validationFieldName,
      initialValue
    },
    apiConfig: {validationMode, type, onlyActiveUser}
  } = params;

  const inputValue: PathValue<T, Path<T>> | undefined = watch(fieldName); // 기본값 선언 안했으면 undefined 될 수 있음.
  const inputErrorMessage = formState.errors[fieldName]?.message as string | undefined;
  const queryClient = useQueryClient();

  /**
   * 단 주의 할 점은, 아래 상황에서 중복검사 API가 호출되면 안됨
   * 1. 최초 렌더링시점 (수정페이지 진입했는데 닉네임 이미 존재한다고 뜨면 말이안됨. 당연하지 내가 쓰고있으니까)
   * 2. 빈문자열을 포함해서 클라이언트 유효성검증을 통과하지 못한경우
   * 3. 현재 내 닉네임과 동일한 경우 (홍길동에서 님 추가했다가 다시 님 삭제한 경우 홍길동과 동일해서 이 때 호출되면 안됨) ==> 이 경우 즉시 성공으로 판단해야.
   */
  useEffect(() => {
    if (!inputValue || inputErrorMessage || initialValue === inputValue) {
      return;
    }

    const timeoutId = setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY, type, inputValue, validationMode, onlyActiveUser],
        queryFn: () =>
          getUserFieldCountApi({
            type,
            value: inputValue,
            validationMode,
            onlyActiveUser
          }),
        staleTime: 5 * 60 * 1000
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [type, inputValue, queryClient, validationMode, inputErrorMessage, onlyActiveUser, initialValue]);

  const queryResult = useQuery<ProcessedUserFieldCountApiResponse>({
    queryKey: [QUERY_KEY, type, inputValue, validationMode, onlyActiveUser],
    refetchOnWindowFocus: false,
    enabled: false
  });

  useEffect(() => {
    if (!queryResult.data) {
      return;
    }

    setValue(validationFieldName, queryResult.data.validated as PathValue<T, Path<T>>);
  }, [queryResult.data, setValue, validationFieldName]);

  // 회원정보 수정폼에서 최초렌더링 / 이후 수정하다 다시 바꿔서 옛날 값으로 바꿨다면, API 호출없이 true로 바꿔줘야.
  useEffect(() => {
    if (inputValue && initialValue === inputValue) {
      setValue(validationFieldName, true as PathValue<T, Path<T>>);
    }
  }, [inputValue, initialValue, setValue, validationFieldName]);

  const errorMessage = determinePriorityErrorMessage({
    inputValue,
    inputErrorMessage,
    apiErrorMessage: generateApiErrorMessage({validationMode, type}),
    queryResult
  });

  const isSuccess = !!queryResult.data?.validated;

  console.log('validatedResult', queryResult.data?.validated);

  return {
    errorMessage,
    isSuccess,
    isLoading: queryResult.isLoading
  };
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const QUERY_KEY = 'CHECK_DUPLICATION'

const FIELD_TYPE_LABELS: Record<UserFieldCountApiRequest['type'], string> = {
  nick_name: '닉네임',
  email: '이메일'
};

function generateApiErrorMessage({validationMode, type}: Pick<UserFieldCountApiRequest, 'validationMode' | 'type'>) {
  if (validationMode === 'does-not-exist') {
    return `이미 존재하는 ${FIELD_TYPE_LABELS[type]}입니다.`;
  } else {
    return `존재하지 않는 ${FIELD_TYPE_LABELS[type]}입니다.`;
  }
}

interface PriorityErrorMessageParams {
  inputValue?: string; // watch('someKey')
  inputErrorMessage: string | undefined; // formState.errors.someKey.message
  apiErrorMessage: string; // Message to show when the API returns a validation error (e.g., "이미 사용중인 닉네임입니다")
  queryResult: UseQueryResult<ProcessedUserFieldCountApiResponse>;
}

function determinePriorityErrorMessage(params: PriorityErrorMessageParams) {
  const {inputValue, inputErrorMessage, queryResult, apiErrorMessage} = params;

  if (!inputValue?.length) {
    return undefined;
  }

  if (inputErrorMessage) {
    return inputErrorMessage;
  }

  if (queryResult.isFetching || !queryResult.data) {
    return undefined;
  }

  if (queryResult.data.errorMessage) {
    return queryResult.data.errorMessage;
  }

  if (!queryResult.data.validated) {
    return apiErrorMessage;
  }

  return undefined;
}
