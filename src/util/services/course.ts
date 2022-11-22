import type {CourseOrderby} from '@type/response-sub/course-sub';
import type {PaginationConfig} from '@util/pagination/pagination-core';

export const COURSE_PAGINATION_CONFIG: PaginationConfig = {
  articlePerPage: 20,
  pagePerView: 5
};

export const COURSE_ORDERBY: CourseOrderby[] = ['room', 'startTimestamp'];
