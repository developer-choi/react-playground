import type {BrandListResponse} from '@type/response/brand';
import {axiosInstance} from '@api/config';

export async function getBrandListApi() {
  const {data} = await axiosInstance.get<BrandListResponse>('/brand/list');
  return data;
}
