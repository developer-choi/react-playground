import BaseApi from '@api/BaseApi';
import type {AxiosResponse} from 'axios';
import type {BoardListResponse} from '@type/response/board';
import {CurrentlyLoginUserInfo, getCurrentlyLoginUserInfo} from '@util/auth/auth';
import type {Board} from '@type/response-sub/board-sub';

export default class BoardApi extends BaseApi {
  constructor() {
    super('/method');
  }
  
  /** Naming Rule
   * [HTTP-METHOD] + [API URL]
   * GET /some/api/url ==> getSomeApiUrl()
   */
  getBoardList(): Promise<AxiosResponse<BoardListResponse>> {
    return this.axios.get('/get-some');
  }
  
  postBoardCreate({img, boardType, title, content}: CreateBoardParam) {
    const formData = new FormData();
    
    if (img) {
      formData.append('file', img);
    }
    
    const blob = new Blob([JSON.stringify({
      boardType,
      title,
      content,
    })], {type: 'application/json'});
    
    formData.append('json', blob);
    
    return this.axios.post('/post-some', formData, {headers: {'Content-Type': 'multipart/form-data', ...getCurrentlyLoginUserInfo()}});
  }

  postSomePrivateApi() {
    const loginInfo = getCurrentlyLoginUserInfo() as CurrentlyLoginUserInfo; //Assume component checked for login
    return this.axios.post('/some/private/api', {headers: loginInfo});
  }
}

/** Naming Rule
 * [method name] + Param
 */
export interface CreateBoardParam extends Pick<Board, 'title' | 'content' | 'boardType'> {
  img?: File;
}
