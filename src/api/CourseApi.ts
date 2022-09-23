import BaseApi from './BaseApi';
import type {AxiosResponse} from 'axios';
import type {CourseListResponse, CourseRoomsResponse, CourseTopicsResponse} from '@type/response/course';
import type {CourseOrderby} from '@type/response-sub/course-sub';
import type {Sort} from '@util/custom-hooks/useSortButton';

export default class CourseApi extends BaseApi {
  constructor() {
    super('course');
  }

  getList(page: number, config: CourseListConfig): Promise<AxiosResponse<CourseListResponse>> {
    return this.axios.get('/list', {params: {...config, page}});
  }

  getTopics(): Promise<AxiosResponse<CourseTopicsResponse>> {
    return this.axios.get('/topics');
  }

  getRooms(): Promise<AxiosResponse<CourseRoomsResponse>> {
    return this.axios.get('/rooms');
  }
}

type CourseListConfig = Partial<CourseFilter> & Partial<Sort<CourseOrderby>>;

export interface CourseFilter {
  topic: number;
  room: number;
}
