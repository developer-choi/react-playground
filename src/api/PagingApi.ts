import BaseApi from '@api/BaseApi';
import type {PagingListType} from '@pages/api/paging';
import type {AxiosResponse} from 'axios';

export default class PagingApi extends BaseApi {
  constructor() {
    super('paging');
  }
  
  getList(page: number, parentPk?: number): Promise<AxiosResponse<PagingListResponse>> {
    return this.axios.get('', {params: {page, parentPk}});
  }
}

export interface PagingListResponse {
  total: number;
  list: PagingListType[];
}
