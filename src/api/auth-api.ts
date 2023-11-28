import {makeAxiosInstance} from './config';
import type {UserInfoResponse} from '@type/response/user';
import {getLoginTokenInCookie} from '@util/services/auth/auth-token';
import SHA512 from 'sha512-es';
import {validateEmail} from '@util/services/validator/email';
import {validateOriginPassword, validatePassword} from '@util/services/validator/password';
import ValidateError from '@util/services/handle-error/ValidateError';

const axiosInstance = makeAxiosInstance({
  baseURL: '/auth'
});

/**
 * @exception RequestError Occurs when email, password format is incorrect (cause 'email' or 'password')
 * @exception AxiosError Login is restricted because the password is incorrect more than 10 times. (status 1234)
 */
export async function postAuthLoginApi(email: string, password: string): Promise<UserInfoResponse> {
  const {email: _email, password: _password} = validateLogin(email, password);

  const {data} = await axiosInstance.post<UserInfoResponse>('/login', {
    email: _email,
    password: SHA512.hash(_password)
  }, {
    // https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests
    withCredentials: true
  });

  return data;
}

/**
 * @exception AuthError The user is not logged in
 */
export async function putAuthLogoutApi() {
  getLoginTokenInCookie({throwable: true});

  return axiosInstance.put('/logout', {
    // https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests
    withCredentials: true
  });
}

export async function putAuthResetPasswordApi(params: AuthResetPasswordParam) {
  const {originPassword, newPassword} = validateResetPassword(params);
  return axiosInstance.put('/reset-password', {originPassword, newPassword});
}

function validateLogin(email: string, password: string) {
  const emailResult = validateEmail(email);

  if (!emailResult.validated) {
    throw new ValidateError(emailResult.errorMessage, {reason: 'email'});
  }

  const passwordResult = validatePassword(password);

  if (!passwordResult.validated) {
    throw new ValidateError(passwordResult.errorMessage, {reason: 'password'});
  }

  return {
    email, password
  };
}

export interface AuthResetPasswordParam {
  originPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function validateResetPassword({originPassword, newPassword, confirmPassword}: AuthResetPasswordParam): AuthResetPasswordParam {
  const result = validateOriginPassword({newPassword, originPassword, confirmPassword});

  if (!result.validated) {
    switch (result.reason) {
      case 'INVALID_ORIGIN_PASSWORD':
        throw new ValidateError(result.errorMessage, {reason: 'originPassword'});

      case 'INVALID_NEW_PASSWORD':
      case 'ALL_PASSWORDS_ARE_SAME':
        throw new ValidateError(result.errorMessage, {reason: 'newPassword'});

      case 'INVALID_CONFIRM_PASSWORD':
      case 'NOT_MATCH':
      default:
        throw new ValidateError(result.errorMessage, {reason: 'confirmPassword'});
    }
  }

  return {
    newPassword, confirmPassword, originPassword
  };
}
