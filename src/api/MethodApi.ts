import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {MethodGetSomeResponse, MethodPostSomeBody} from '@type/response/method';

export default class MethodApi extends BaseApi {
  constructor() {
    super(undefined, {
      baseURL: 'http://localhost:8000/method'
    });
  }

  getSome(): Promise<AxiosResponse<MethodGetSomeResponse>> {
    return this.axios.get('/some');
  }

  postSome(body: MethodPostSomeBody) {
    return this.axios.post('/some', body);
  }
}
