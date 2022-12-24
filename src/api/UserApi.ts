import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {UserInfoResponse} from '@type/response/user';

export default class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  getUser(userPk: number): Promise<AxiosResponse<UserInfoResponse>> {
    return this.axios.get(`/info/${userPk}`);
  }
}
