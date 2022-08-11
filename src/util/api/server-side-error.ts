import type {GetServerSidePropsResult} from 'next';
import {ValidateError} from '@util/extend/query-string';
import {AuthError} from '@util/auth/auth';
import type {NotifyRedirectProps} from '@component/atom/NotifyRedirect';

export interface HandleServerSideErrorOption {
  notifyRedirect?: NotifyRedirectProps['notifyRedirect'];
}

export function handleServerSideError(error: any, option?: HandleServerSideErrorOption): GetServerSidePropsResult<any> {
  if (error instanceof ValidateError) {
    return handleValidateError(error, option);

  } else if (error instanceof AuthError) {
    return handleAuthError(error);

  } else {
    // unexpected error
    throw error;
  }
}

function handleValidateError(error: ValidateError, option?: HandleServerSideErrorOption): GetServerSidePropsResult<any> {
  if (!option?.notifyRedirect) {
    console.warn('Please pass the option for accurate error processing.');
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
      destination: error.option.redirectUrl
    }
  };
}
