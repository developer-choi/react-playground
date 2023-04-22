import {makeAxiosInstance} from './config';
import type {FilterListResponse} from '@type/response/filter';
import type {ProductListPageParam} from '@util/services/product-filter/filter-common';

const axiosInstance = makeAxiosInstance('/filter');

export type FilterListApiParam = Omit<ProductListPageParam, 'page'>;

export async function getFilterListApi(params: FilterListApiParam): Promise<FilterListResponse> {
  const {data} = await axiosInstance.get<FilterListResponse>('/list', {params});
  return data;
}
