import BaseApi from '@api/BaseApi';
import {getLoginTokenClientSide, getLoginTokenServerSide} from '@util/services/auth/auth';
import type {BoardCreateParam} from '@type/response-sub/board-sub';
import type {GetServerSidePropsContext} from 'next';
import type {AxiosResponse} from 'axios';
import type {BoardListResponse, BoardOneResponse} from '@type/response/board';

export default class BoardApi extends BaseApi {
  constructor() {
    super(undefined, {
      baseURL: "http://localhost:8000/board"
    });
  }

  /** Naming Rule
   * [HTTP-METHOD] + [API URL (Without root path)]
   * GET /some/alpha/beta/gamma ==> getAlphaBetaGamma()
   */
  postCreate(param: BoardCreateParam) {
    const loginToken = getLoginTokenClientSide(); //Errors must be handled in components.
    return this.axios.post('/create', param, {headers: loginToken});
  }

  /**
   * @exception ValidateError Occurs when the boardNo is invalid. (The boardNo must numeric.)
   * @exception AxiosError Occurs when a article does not exist (status 404)
   */
  getOne(context: GetServerSidePropsContext, pk: number): Promise<AxiosResponse<BoardOneResponse>> {
    try {
      const loginToken = getLoginTokenServerSide(context);
      return this.axios.get(`/${pk}`, {headers: loginToken});
    } catch (error) {
      return this.axios.get(`/${pk}`);
    }
  }

  getList(context: GetServerSidePropsContext, page: number): Promise<AxiosResponse<BoardListResponse>> {
    try {
      const loginToken = getLoginTokenServerSide(context);
      return this.axios.get('/list', {params: {page}, headers: loginToken});

    } catch (error) {
      return this.axios.get('/list', {params: {page}});
    }
  }
}
