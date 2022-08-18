import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {UserInfoResponse} from '@type/response/user';
import {getLoginTokenClientSide} from '@util/auth/auth';
import SHA512 from 'sha512-es';
import RequestError from '@util/handle-error/RequestError';

export default class AuthApi extends BaseApi {
  constructor() {
    super('');
  }

  /**
   * @exception RequestError Occurs when email, password format is incorrect (cause 'email' or 'password')
   * @exception AxiosError Login is restricted because the password is incorrect more than 10 times. (status 1234)
   */
  postLogin(email: string, password: string): Promise<AxiosResponse<UserInfoResponse>> {
    const {email: _email, password: _password} = validateLogin(email, password);

    return this.axios.post('/login', {
      userEmail: _email,
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
}

function validateLogin(email: string, password: string) {
  if (email.length === 0) {
    throw new RequestError({content: 'Please enter the email', cause: 'email'});
  }

  if (password.length === 0) {
    throw new RequestError({content: 'Please enter the password', cause: 'password'});
  }

  return {
    email, password
  };
}
