import {makeAxiosInstance} from './config';
import type {AxiosResponse} from 'axios';
import type {CourseListResponse, CourseRoomsResponse, CourseTopicsResponse} from '@type/response/course';
import type {Sort} from '@type/response-sub/common-sub';
import type {CourseSortType} from '@type/response-sub/course-sub';

const axiosInstance = makeAxiosInstance('/course');

export async function getCourseListApi(params: CourseListApiParam): Promise<CourseListResponse> {
  const {data} = await axiosInstance.get('/list', {params});
  return data;
}

export async function getCourseTopicsApi(): Promise<CourseTopicsResponse> {
  const {data} = await axiosInstance.get<CourseTopicsResponse>('/topics');
  return data;
}

export async function getCourseRoomsApi(): Promise<CourseRoomsResponse> {
  const {data} = await axiosInstance.get<CourseRoomsResponse>('/rooms');
  return data;
}

export async function putCourseLikeApi(pk: number): Promise<AxiosResponse<void>> {
  return axiosInstance.put('/like', {pk});
}

export async function putCourseCancelLikeApi(pk: number): Promise<AxiosResponse<void>> {
  return axiosInstance.put('/cancel-like', {pk});
}

interface CourseListApiParam extends Partial<CourseFilter>, Partial<Sort<CourseSortType>> {
  articlePerPage?: number;
  page: number;
}

export interface CourseFilter {
  topic: number;
  room: number;
}
