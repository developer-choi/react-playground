import type {CourseOrderby} from '@type/response-sub/course-sub';
import type {MultiplePagesPaginationConfig} from '@util/services/pagination/pagination-core';
import {useKeepQuery} from '@util/extend/router';
import {useCallback} from 'react';
import type {CourseFilter} from '@api/CourseApi';
import type {Direction} from '@util/custom-hooks/useSort';

export const COURSE_PAGINATION_CONFIG: MultiplePagesPaginationConfig = {
  articlePerPage: 20,
  pagePerView: 5
};

export const COURSE_ORDERBY: CourseOrderby[] = ['room', 'startTimestamp'];

export interface CourseUrlQuery extends CourseFilter {
  orderby: CourseOrderby;
  direction: Direction;
}

export function useKeepQueryCourse() {
  const {pushKeepQuery} = useKeepQuery();

  const pushFilterOrSort = useCallback((query: Partial<CourseUrlQuery>) => {
    return pushKeepQuery(query, '/examples/api/sort-filter/list/1', ['page']);
  }, [pushKeepQuery]);

  return {
    pushFilterOrSort,
  };
}
