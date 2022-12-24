import type {GetServerSidePropsResult} from 'next';
import {haveAxiosResponse} from '@api/BaseApi';
import type {NotifyRedirectProps} from '@component/atom/NotifyRedirect';
import {AuthError} from '@util/services/auth/AuthError';
import ValidateError from '@util/services/handle-error/ValidateError';
import type {AxiosError} from 'axios';

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
    props: {
      notifyRedirect: option.notifyRedirect
    }
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

function handleAxiosError(error: AxiosError, option?: HandleServerSideErrorOption): GetServerSidePropsResult<any> {
  if (option?.notifyRedirect) {
    return {
      props: {
        notifyRedirect: option.notifyRedirect
      }
    };
  }

  console.log('Object.keys(error)', Object.keys(error));

  if (error.response) {
    console.error('error.response.data', error.response.data);
    console.error('error.response.status', error.response.status);
    console.error('error.response.headers', error.response.headers);
  } else if (error.request) {
    console.error('error.request', error.request);
  } else {
    console.error('error.message', error.message);
  }

  throw error;
}
