import {axiosInstance} from '@api/config';
import type {VideoListResponse, VideoResponse} from '@type/response/video';

export async function getVideoOneApi(pk: number | string) {
  const {data} = await axiosInstance.get<VideoResponse>(`/video/${pk}`, {params: {pk}});
  return data;
}

export async function getVideoListApi() {
  const {data} = await axiosInstance.get<VideoListResponse>('/video/list');
  return data;
}
