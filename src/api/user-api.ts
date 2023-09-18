import {makeAxiosInstance} from './config';
import type {UserInfoResponse} from '@type/response/user';

const axiosInstance = makeAxiosInstance({
  baseURL: '/user'
});

export async function getUserInfoOneApi(userPk: number): Promise<UserInfoResponse> {
  const {data} = await axiosInstance.get<UserInfoResponse>(`/info/${userPk}`);
  return data;
}
