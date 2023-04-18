import {makeAxiosInstance} from './config';
import type {CategoryListResponse} from '@type/response/category';

const axiosInstance = makeAxiosInstance('/category');

export async function getCategoryListApi(): Promise<CategoryListResponse> {
  const {data} = await axiosInstance.get<CategoryListResponse>('/list');
  return data;
}
