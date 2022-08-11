import BaseApi from '@api/BaseApi';
import type {AxiosResponse} from 'axios';
import {getLoginTokenClientSide, getLoginTokenServerSide, LoginToken} from '@util/auth/auth';
import type {Board} from '@type/response-sub/board-sub';
import type {GetServerSidePropsContext} from 'next';
import type {BoardOneResponse} from '@type/response/board';

export default class BoardApi extends BaseApi {
  constructor() {
    super('/method');
  }

  getBoardOne(boardNo: number): Promise<AxiosResponse<BoardOneResponse>> {
    return this.axios.get('/get-some', {params: {boardNo}});
  }
  
  postBoardCreate({img, boardType, title, content}: BoardCreateParam) {
    const loginToken = getLoginTokenClientSide(); //Errors must be handled in components.
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

    return this.axios.post('/post-some', formData, {headers: {'Content-Type': 'multipart/form-data', ...loginToken}});

    /** Example of a caller (Component)
     * try {
     *   const api = new BoardApi();
     *   await api.postSomePrivateApi();
     * } catch (error) {
     *   handleErrorInClientSide(error);
     * }
     */
  }

  getSomePrivateApiClientSide(): Promise<AxiosResponse<SomePrivateApiResponse>> {
    const loginInfo = getLoginTokenClientSide();
    return this.getSomePrivateApi(loginInfo);
  }

  getSomePrivateApiServerSide(context: GetServerSidePropsContext): Promise<AxiosResponse<SomePrivateApiResponse>> {
    const loginInfo = getLoginTokenServerSide(context);
    return this.getSomePrivateApi(loginInfo);
  }

  private getSomePrivateApi(loginInfo: LoginToken): Promise<AxiosResponse<SomePrivateApiResponse>> {
    return this.axios.get('/get-some', {headers: loginInfo});
  }
}

export interface BoardCreateParam extends Pick<Board, 'title' | 'content' | 'boardType'> {
  img?: File;
}

type SomePrivateApiResponse = any;