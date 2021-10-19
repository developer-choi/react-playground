import BaseApi from '@api/BaseApi';
import type { AxiosResponse } from 'axios';
import type { BoardListResponse } from '@type/response/board';
import { getCurrentlyLoginUserInfo } from '@util/auth/auth';

export default class BoardApi extends BaseApi {
  constructor() {
    super('/board');
  }
  
  getList(): Promise<AxiosResponse<BoardListResponse>> {
    return this.axios.get('/list');
  }
  
  postSome() {
    // I have to add a session to the header just before calling the API.
    return this.axios.post('/some', {}, {headers: getCurrentlyLoginUserInfo()});
  }
}
