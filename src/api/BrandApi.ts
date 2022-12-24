import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {BrandListResponse} from '@type/response/brand';

export default class BrandApi extends BaseApi {
  constructor() {
    super(undefined, {
      baseURL: "http://localhost:8000/brand"
    });
  }

  getList(): Promise<AxiosResponse<BrandListResponse>> {
    return this.axios.get('/list');
  }
}
