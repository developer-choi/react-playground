import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {BrandListResponse} from '@type/response/brand';

export default class BrandApi extends BaseApi {
  constructor() {
    super('/brand');
  }

  getList(): Promise<AxiosResponse<BrandListResponse>> {
    return this.axios.get('/list');
  }
}
