import {makeAxiosInstance} from '@api/config';
import {getLoginTokenInCookie} from '@util/services/auth/auth-core';
import type {BoardCreateParam} from '@type/response-sub/board-sub';
import type {GetServerSidePropsContext} from 'next';
import type {AxiosResponse} from 'axios';
import type {BoardListResponse, BoardOneResponse} from '@type/response/board';

const axiosInstance = makeAxiosInstance({
  baseURL: '/board'
});

/**
 * @exception AuthError The user is not logged in
 */
export async function postBoardApi(param: BoardCreateParam) {
  getLoginTokenInCookie({throwable: true}); //Errors must be handled in components.

  return axiosInstance.post('/create', param);
}

/**
 * @exception ValidateError Occurs when the boardNo is invalid. (The boardNo must numeric.)
 * @exception AxiosError Occurs when a article does not exist (status 404)
 */
export async function getBoardOneApi(context: GetServerSidePropsContext, pk: number): Promise<BoardOneResponse> {
  let response: Promise<AxiosResponse<BoardOneResponse>>;

  try {
    getLoginTokenInCookie({
      context,
      throwable: true
    });
    response = axiosInstance.get<BoardOneResponse>(`/${pk}`);
  } catch (error) {
    response = axiosInstance.get<BoardOneResponse>(`/${pk}`);
  }

  return (await response).data;
}

export async function getBoardListApi(context: GetServerSidePropsContext, page: number): Promise<BoardListResponse> {
  let response: Promise<AxiosResponse<BoardListResponse>>;

  try {
    getLoginTokenInCookie({
      context,
      throwable: true
    });
    response = axiosInstance.get<BoardListResponse>('/list', {params: {page}});

  } catch (error) {
    response = axiosInstance.get<BoardListResponse>('/list', {params: {page}});
  }

  return (await response).data;
}
