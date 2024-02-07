import {AuthError, useHandleAuthErrorInClient} from '@util/services/auth/auth-redirect';
import type {AxiosErrorWithResponse} from '@api/config';
import {haveAxiosResponse} from '@api/config';
import {toast} from 'react-toastify';
import ValidateError from '@util/services/handle-error/ValidateError';
import {useCallback} from 'react';
import {useLogout} from '@util/services/auth/auth-user-cache';

export function useHandleClientSideError() {
  const handleErrorAfterRespondApi = useHandleErrorAfterRespondApi();
  const handleErrorBeforeCallApi = useHandleErrorBeforeCallApi();

  return useCallback((error: any) => {
    if (!error.isAxiosError) {
      handleErrorBeforeCallApi(error);
      return;

    } else if (!haveAxiosResponse(error)) {
      handleUnexpectedError(error);

    } else {
      handleErrorAfterRespondApi(error);
    }
  }, [handleErrorAfterRespondApi, handleErrorBeforeCallApi]);
}

function useHandleErrorBeforeCallApi() {
  const handleAuthError = useHandleAuthErrorInClient();

  return useCallback((error: any) => {
    if (error instanceof AuthError) {
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
  }, [handleAuthError]);
}

function handleValidateError(error: ValidateError) {
  toast.error(error.message);
}

function useHandleErrorAfterRespondApi() {
  const logout = useLogout();

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
  }, [logout]);
}

const BLOCK_USER_STATUS_CODE = 701;

function handleUnexpectedError(error: any) {
  console.error(error);
  toast.error('잠시 후 다시 시도해주세요.');
}
