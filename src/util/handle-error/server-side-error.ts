import type {GetServerSidePropsResult} from 'next';
import {haveAxiosResponse} from '@api/BaseApi';
import type {NotifyRedirectProps} from '@component/atom/NotifyRedirect';
import {ValidateError} from '@util/extend/query-string';
import {AuthError} from '@util/auth/AuthError';

export interface HandleServerSideErrorOption {
  notifyRedirect?: NotifyRedirectProps['notifyRedirect'];
}

export function handleServerSideError<T = any>(error: any, option?: HandleServerSideErrorOption): GetServerSidePropsResult<T> {
  if (error instanceof ValidateError) {
    return handleValidateError(error, option);

  } else if (error instanceof AuthError) {
    return handleAuthError(error);

  } else {
    const axiosError = haveAxiosResponse(error);

    if (axiosError) {
      return handleAxiosError(error, option);

    } else {
      throw error;
    }
  }
}

function handleValidateError(error: ValidateError, option?: HandleServerSideErrorOption): GetServerSidePropsResult<any> {
  if (!option?.notifyRedirect) {
    console.warn('ValidateError가 발생했으나 option 으로 message와 destionation이 전달되지 않았습니다. 정확한 에러처리를 위해 전달해주세요.');
    throw error;
  }

  return {
    props: option.notifyRedirect
  };
}

function handleAuthError(error: AuthError): GetServerSidePropsResult<any> {
  return {
    redirect: {
      permanent: false,
      destination: error.option.loginPageUrlWithRedirectUrl
    }
  };
}

function handleAxiosError(error: any, option?: HandleServerSideErrorOption): GetServerSidePropsResult<any> {
  if (option?.notifyRedirect) {
    return {
      props: option.notifyRedirect
    };
  }

  throw error;
}
