import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {UserInfoResponse} from '@type/response/user';
import {getLoginTokenClientSide} from '@util/auth/auth';
import SHA512 from 'sha512-es';
import RequestError from '@util/handle-error/RequestError';
import {validateEmail} from '@util/validator/email';
import {validateOriginPassword, validatePassword} from '@util/validator/password';

export default class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  /**
   * @exception RequestError Occurs when email, password format is incorrect (cause 'email' or 'password')
   * @exception AxiosError Login is restricted because the password is incorrect more than 10 times. (status 1234)
   */
  postLogin(email: string, password: string): Promise<AxiosResponse<UserInfoResponse>> {
    const {email: _email, password: _password} = validateLogin(email, password);

    return this.axios.post('/login', {
      email: _email,
      password: SHA512.hash(_password)
    });
  }

  /**
   * @exception AuthError The user is not logged in
   */
  postLogout() {
    const loginToken = getLoginTokenClientSide();
    return this.axios.post('/logout', loginToken);
  }

  putResetPassword(params: AuthResetPasswordParam) {
    const {originPassword, newPassword} = validateResetPassword(params);
    return this.axios.put('/reset-password', {originPassword, newPassword});
  }
}

function validateLogin(email: string, password: string) {
  const emailResult = validateEmail({value: email});

  if (!emailResult.validated) {
    throw new RequestError({content: emailResult.errorMessage, reason: 'email'});
  }

  const passwordResult = validatePassword({value: password});

  if (!passwordResult.validated) {
    throw new RequestError({content: passwordResult.errorMessage, reason: 'password'});
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
        throw new RequestError({content: result.errorMessage, reason: 'originPassword'});

      case 'INVALID_NEW_PASSWORD':
      case 'ALL_PASSWORDS_ARE_SAME':
        throw new RequestError({content: result.errorMessage, reason: 'newPassword'});

      case 'INVALID_CONFIRM_PASSWORD':
      case 'NOT_MATCH':
      default:
        throw new RequestError({content: result.errorMessage, reason: 'confirmPassword'});
    }
  }

  return {
    newPassword, confirmPassword, originPassword
  };
}
