import {makeAxiosInstance} from './config';
import type {BrandListResponse} from '@type/response/brand';

const axiosInstance = makeAxiosInstance({
  baseURL: '/brand'
});

export async function getBrandListApi(): Promise<BrandListResponse> {
  const {data} = await axiosInstance.get<BrandListResponse>('/list');
  return data;
}
