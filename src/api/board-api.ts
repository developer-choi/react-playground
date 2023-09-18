import {makeAxiosInstance} from '@api/config';
import {getLoginTokenClientSide, getLoginTokenServerSide} from '@util/services/auth/auth';
import type {BoardCreateParam} from '@type/response-sub/board-sub';
import type {GetServerSidePropsContext} from 'next';
import type {AxiosResponse} from 'axios';
import type {BoardListResponse, BoardOneResponse} from '@type/response/board';

const axiosInstance = makeAxiosInstance({
  baseURL: '/board'
});

export async function postBoardApi(param: BoardCreateParam) {
  const loginToken = getLoginTokenClientSide(); //Errors must be handled in components.
  return axiosInstance.post('/create', param, {headers: loginToken});
}

/**
 * @exception ValidateError Occurs when the boardNo is invalid. (The boardNo must numeric.)
 * @exception AxiosError Occurs when a article does not exist (status 404)
 */
export async function getBoardOneApi(context: GetServerSidePropsContext, pk: number): Promise<BoardOneResponse> {
  let response: Promise<AxiosResponse<BoardOneResponse>>;

  try {
    const loginToken = getLoginTokenServerSide(context);
    response = axiosInstance.get<BoardOneResponse>(`/${pk}`, {headers: loginToken});
  } catch (error) {
    response = axiosInstance.get<BoardOneResponse>(`/${pk}`);
  }

  return (await response).data;
}

export async function getBoardListApi(context: GetServerSidePropsContext, page: number): Promise<BoardListResponse> {
  let response: Promise<AxiosResponse<BoardListResponse>>;

  try {
    const loginToken = getLoginTokenServerSide(context);
    response = axiosInstance.get<BoardListResponse>('/list', {params: {page}, headers: loginToken});

  } catch (error) {
    response = axiosInstance.get<BoardListResponse>('/list', {params: {page}});
  }

  return (await response).data;
}
