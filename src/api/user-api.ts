import type {UserInfoResponse} from "@type/response/user";
import type {GetServerSidePropsContext} from "next";
import {getAxiosInstance} from "@api/config";

export async function getUserInfoOneApi(userPk: number, context?: GetServerSidePropsContext) {
  const {data} = await getAxiosInstance(context).get<UserInfoResponse>(`/user/info/${userPk}`);
  return data;
}
