import {getLoginTokenInCookie} from '@util/services/auth/auth-token';
import type {BoardCreateParam} from '@type/response-sub/board-sub';
import type {GetServerSidePropsContext} from 'next';
import type {BoardListResponse, BoardOneResponse} from '@type/response/board';
import {axiosInstance, getAxiosInstance} from '@api/config';

/**
 * @exception AuthError The user is not logged in
 */
export async function postBoardApi(param: BoardCreateParam) {
  getLoginTokenInCookie({throwable: true}); //Errors must be handled in components.

  return axiosInstance.post('/board/create', param);
}

/**
 * @exception ValidateError Occurs when the boardNo is invalid. (The boardNo must numeric.)
 * @exception AxiosError Occurs when a article does not exist (status 404)
 */
export async function getBoardOneApi(context: GetServerSidePropsContext, pk: number) {
  getLoginTokenInCookie({
    context,
    throwable: true
  });

  const {data} = await getAxiosInstance(context).get<BoardOneResponse>(`/board/${pk}`);
  return data;
}

export async function getBoardListApi(context: GetServerSidePropsContext, page: number) {
  getLoginTokenInCookie({
    context,
    throwable: true
  });

  const {data} = await getAxiosInstance(context).get<BoardListResponse>('/board/list', {params: {page}});
  return data;
}
