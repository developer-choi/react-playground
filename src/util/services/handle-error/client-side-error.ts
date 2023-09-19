import {useRouter} from 'next/router';
import {AuthError} from '@util/services/auth/AuthError';
import type {AxiosErrorWithResponse} from '@api/config';
import {haveAxiosResponse} from '@api/config';
import {toast} from 'react-toastify';
import ValidateError from '@util/services/handle-error/ValidateError';
import {useCallback} from "react";
import {useLogout} from "@util/services/auth/auth-core";
import {useClearLoginUserInfo} from '@util/services/auth/auth-user';

export function useHandleClientSideError() {
  const handleErrorAfterRespondApi = useHandleErrorAfterRespondApi()
  const handleErrorBeforeCallApi = useHandleErrorBeforeCallApi()
  
  return useCallback((error: any) => {
    if (!error.isAxiosError) {
      handleErrorBeforeCallApi(error);
      return;

    } else if (!haveAxiosResponse(error)) {
      handleUnexpectedError(error);

    } else {
      handleErrorAfterRespondApi(error);
    }
  }, [handleErrorAfterRespondApi, handleErrorBeforeCallApi])
}

function useHandleErrorBeforeCallApi() {
  const handleAuthError = useHandleAuthError()

  return useCallback((error: any) => {
    if(error instanceof AuthError) {
      handleAuthError(error);
      return;
    }

    if (error instanceof ValidateError) {
      handleValidateError(error);
      return;
    }

    if ([SyntaxError, ReferenceError, TypeError].some(SomeError => error in SomeError)) {
      handleUnexpectedError(error);
      return;
    }

    /** another handling error codes here
     *
     */
  }, [handleAuthError])
}

/**
 * Case1. 그냥 로그인 안해놓고 로그인해야만 누를 수 있는 버튼을 누른 경우
 * Case2. 다른탭에서 로그아웃해놓고 지금 보고있는 페이지(in private or in public)에서 로그인해야 누를 수 있는 버튼 누른경우
 * - 이미 로그아웃은 되어있다고 예상하고있고,
 * - AuthError가 발생했다는것은 쿠키에 LoginToken이 없다는것이므로
 * - queryClient로 rq에 저장된 유저정보만 초기화해서 유저정보, 로그인여부만 다시 초기화하려고하는것
 */
function useHandleAuthError() {
  const {push} = useRouter();
  const clearLoginUserInfo = useClearLoginUserInfo();
  
  return useCallback((error: AuthError) => {
    clearLoginUserInfo();
    
    if (confirm('로그인 후 이용이 가능합니다.')) {
      push(error.option.redirectUrl);
    }
  }, [clearLoginUserInfo, push])
}

function handleValidateError(error: ValidateError) {
  toast.error(error.message);
}

function useHandleErrorAfterRespondApi() {
  const logout = useLogout()

  return useCallback((error: AxiosErrorWithResponse) => {
    const {status} = error.response;

    switch (status) {
      case BLOCK_USER_STATUS_CODE:
        toast.error('관리자에 의해 계정이 정지되었습니다.');
        logout();
        return;
    }

    if ('message' in error.response.data) {
      const {message} = error.response.data;
      toast.error(message);
      return;
    }

    handleUnexpectedError(error);
  }, [logout])
}

const BLOCK_USER_STATUS_CODE = 701;

function handleUnexpectedError(error: any) {
  console.error(error);
  toast.error('잠시 후 다시 시도해주세요.');
}
