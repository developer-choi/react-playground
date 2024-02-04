import type {AccountBookListResponse} from '@type/response/account-book';
import {axiosInstance} from '@api/config';

export async function postAccountParseApi(text: string) {
  const {data} = await axiosInstance.post<AccountBookListResponse>('/account/parse', {text});
  return data;
}
