import {makeAxiosInstance} from './config';
import type {MethodGetSomeResponse, MethodPostSomeBody} from '@type/response/method';

const axiosInstance = makeAxiosInstance({
  baseURL: '/method'
});

export async function getMethodSomeApi(): Promise<MethodGetSomeResponse> {
  const {data} = await axiosInstance.get<MethodGetSomeResponse>('/some');
  return data;
}

export async function postMethodSomeApi(body: MethodPostSomeBody) {
  return axiosInstance.post('/some', body);
}
