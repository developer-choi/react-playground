import {makeAxiosInstance} from '@api/config';
import type {AccountBookListResponse} from '@type/response/account-book';

const axiosInstance = makeAxiosInstance('/account');

export async function getAccountPresetListApi() {
  return axiosInstance.get<AccountBookListResponse>('/preset');
}
