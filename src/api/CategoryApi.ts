import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {CategoryListResponse} from '@type/response/category';

export default class CategoryApi extends BaseApi {
  constructor() {
    super(undefined, {
      baseURL: "http://localhost:8000/category"
    });
  }

  getList(): Promise<AxiosResponse<CategoryListResponse>> {
    return this.axios.get('/list');
  }
}
