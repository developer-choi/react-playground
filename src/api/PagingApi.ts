import BaseApi from '@api/BaseApi';
import type {PagingListType} from '@pages/api/paging';
import type {AxiosResponse} from 'axios';

export default class PagingApi extends BaseApi {
  constructor() {
    super('paging');
  }
  
  getList(page: number): Promise<AxiosResponse<PagingListResponse>> {
    return this.axios.get('', {params: {page}});
  }
}

export interface PagingListResponse {
  total: number;
  list: PagingListType[];
}
