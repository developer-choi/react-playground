import type {CourseSortType} from '@type/response-sub/course-sub';
import type {MultiplePagesPaginationConfig} from '@util/services/pagination/pagination-core';
import {useKeepQuery} from '@util/extend/router';
import {useCallback} from 'react';
import type {CourseFilter} from '@api/CourseApi';

export const COURSE_PAGINATION_CONFIG: MultiplePagesPaginationConfig = {
  articlePerPage: 20,
  pagePerView: 5
};

export const COURSE_SORT_ITEMS: {sort: CourseSortType, name: string}[] = [
  {sort: 'start-asc', name: '시작시간 오름차순'},
  {sort: 'start-desc', name: '시작시간 내림차순'},
  {sort: 'room-asc', name: '강의실 오름차순'},
  {sort: 'room-desc', name: '강의실 내림차순'},
];

export const COURSE_SORT_TYPES: CourseSortType[] = [
  'start-asc',
  'start-desc',
  'room-asc',
  'room-desc'
]

export interface CourseUrlQuery extends CourseFilter {
  sort: CourseSortType;
}

export function useKeepQueryCourse() {
  const {pushKeepQuery} = useKeepQuery();

  const pushFilterOrSort = useCallback((query: Partial<CourseUrlQuery>) => {
    return pushKeepQuery(query, '/feature/sort-filter/list/1', ['page']);
  }, [pushKeepQuery]);

  return {
    pushFilterOrSort,
  };
}
