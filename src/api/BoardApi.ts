import BaseApi from '@api/BaseApi';
import type {AxiosResponse} from 'axios';
import type {BoardListResponse} from '@type/response/board';
import {getCurrentlyLoginUserInfo} from '@util/auth/auth';
import type {Board} from '@type/response-sub/board-sub';

export default class BoardApi extends BaseApi {
  constructor() {
    super('/board');
  }
  
  getList(): Promise<AxiosResponse<BoardListResponse>> {
    return this.axios.get('/list');
  }
  
  createBoard({img, boardType, title, content}: CreateBoardParam) {
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
    
    return this.axios.post('/create', formData, {headers: {'Content-Type': 'multipart/form-data', ...getCurrentlyLoginUserInfo()}});
  }
}

/** Naming Rule
 * [method name] + Param
 */
export interface CreateBoardParam extends Pick<Board, 'title' | 'content' | 'boardType'> {
  img?: File;
}
