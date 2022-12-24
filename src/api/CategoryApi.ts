import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {CategoryListResponse} from '@type/response/category';

export default class CategoryApi extends BaseApi {
  constructor() {
    super('/category');
  }

  getList(): Promise<AxiosResponse<CategoryListResponse>> {
    return this.axios.get('/list');
  }
}
