import {makeAxiosInstance} from '@api/config';
import type {VideoListResponse, VideoResponse} from '@type/response/video';

const axiosInstance = makeAxiosInstance('/video');

export async function getVideoOneApi(pk: number | string): Promise<VideoResponse> {
  const {data} = await axiosInstance.get<VideoResponse>(`/${pk}`, {params: {pk}});
  return data;
}

export async function getVideoListApi(): Promise<VideoListResponse> {
  const {data} = await axiosInstance.get<VideoListResponse>('/list');
  return data;
}
