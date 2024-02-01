import {axiosInstance, getAxiosInstance} from "@api/config";
import type {VideoListResponse, VideoResponse} from "@type/response/video";
import type {GetServerSidePropsContext} from "next";

export async function getVideoOneApi(pk: number | string, context?: GetServerSidePropsContext) {
  const {data} = await getAxiosInstance(context).get<VideoResponse>(`/video/${pk}`, {params: {pk}});
  return data;
}

export async function getVideoListApi() {
  const {data} = await axiosInstance.get<VideoListResponse>("/video/list");
  return data;
}
