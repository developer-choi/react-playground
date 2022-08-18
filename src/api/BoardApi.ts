import BaseApi from '@api/BaseApi';
import {getLoginTokenClientSide, getLoginTokenServerSide} from '@util/auth/auth';
import type {Board} from '@type/response-sub/board-sub';
import type {GetServerSidePropsContext} from 'next';
import type {AxiosResponse} from 'axios';
import type {BoardListResponse, BoardOneResponse} from '@type/response/board';

export default class BoardApi extends BaseApi {
  constructor() {
    super('/board');
  }

  postBoardCreate(param: BoardCreateParam) {
    const loginToken = getLoginTokenClientSide(); //Errors must be handled in components.
    return this.axios.post('/create', param, {headers: loginToken});
  }

  /**
   * @exception ValidateError Occurs when the boardNo is invalid. (The boardNo must numeric.)
   * @exception AxiosError Occurs when a article does not exist (status 404)
   */
  getBoardOne(context: GetServerSidePropsContext, pk: number): Promise<AxiosResponse<BoardOneResponse>> {
    try {
      const loginToken = getLoginTokenServerSide(context);
      return this.axios.get('/one', {params: {pk}, headers: loginToken});
    } catch (error) {
      return this.axios.get('/one', {params: {pk}});
    }
  }

  getBoardList(context: GetServerSidePropsContext, page: number): Promise<AxiosResponse<BoardListResponse>> {
    try {
      const loginToken = getLoginTokenServerSide(context);
      return this.axios.get('/list', {params: {page}, headers: loginToken});

    } catch (error) {
      return this.axios.get('/list', {params: {page}});
    }
  }
}

export type BoardCreateParam = Pick<Board, 'title' | 'content' | 'boardType'>;
