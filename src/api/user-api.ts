import {makeAxiosInstance} from './config';
import type {UserInfoResponse} from '@type/response/user';
import type {GetServerSidePropsContext} from 'next';

export async function getUserInfoOneApi(userPk: number, context?: GetServerSidePropsContext): Promise<UserInfoResponse> {
  const axiosInstance = makeAxiosInstance({
    baseURL: '/user',
    context
  });

  const {data} = await axiosInstance.get<UserInfoResponse>(`/info/${userPk}`);

  return data;
}
