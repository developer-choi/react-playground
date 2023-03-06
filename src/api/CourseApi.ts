import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {CourseListResponse, CourseRoomsResponse, CourseTopicsResponse} from '@type/response/course';
import type {Sort} from '@type/response-sub/common-sub';
import type {CourseSortType} from '@type/response-sub/course-sub';

export default class CourseApi extends BaseApi {
  constructor() {
    super('/course');
  }

  getList(page: number, config?: CourseListConfig): Promise<AxiosResponse<CourseListResponse>> {
    return this.axios.get('/list', {params: {...config, page}});
  }

  getTopics(): Promise<AxiosResponse<CourseTopicsResponse>> {
    return this.axios.get('/topics');
  }

  getRooms(): Promise<AxiosResponse<CourseRoomsResponse>> {
    return this.axios.get('/rooms');
  }

  putLike(pk: number): Promise<AxiosResponse<void>> {
    return this.axios.put('/like', {pk});
  }

  putCancelLike(pk: number): Promise<AxiosResponse<void>> {
    return this.axios.put('/cancel-like', {pk});
  }
}

type CourseListConfig = Partial<CourseFilter> & Partial<Sort<CourseSortType>>;

export interface CourseFilter {
  topic: number;
  room: number;
}
