import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {UserInfoResponse} from '@type/response/user';

export default class AuthApi extends BaseApi {
  constructor() {
    super('');
  }

  postLogin(email: string, password: string): Promise<AxiosResponse<UserInfoResponse>> {
    return this.axios.post('/login', {email, password});
  }
}
