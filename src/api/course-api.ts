import type {CourseListResponse, CourseRoomsResponse, CourseTopicsResponse} from "@type/response/course";
import type {Sort} from "@type/response-sub/common-sub";
import type {CourseSortType} from "@type/response-sub/course-sub";
import {axiosInstance} from "@api/config";

export async function getCourseListApi(params: CourseListApiParam) {
  const {data} = await axiosInstance.get<CourseListResponse>("/course/list", {params});
  return data;
}

export async function getCourseTopicsApi() {
  const {data} = await axiosInstance.get<CourseTopicsResponse>("/course/topics");
  return data;
}

export async function getCourseRoomsApi() {
  const {data} = await axiosInstance.get<CourseRoomsResponse>("/course/rooms");
  return data;
}

export async function putCourseLikeApi(pk: number) {
  return axiosInstance.put("/course/like", {pk});
}

export async function putCourseCancelLikeApi(pk: number) {
  return axiosInstance.put("/course/cancel-like", {pk});
}

interface CourseListApiParam extends Partial<CourseFilter>, Partial<Sort<CourseSortType>> {
  articlePerPage?: number;
  page: number;
}

export interface CourseFilter {
  topic: number;
  room: number;
}
