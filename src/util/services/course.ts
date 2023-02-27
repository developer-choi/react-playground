import type {CourseSortType} from '@type/response-sub/course-sub';
import type {MultiplePagesPaginationConfig} from '@util/services/pagination/pagination-core';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {useKeepQuery} from '@util/extend/router';
import {itemListToDataOfType} from '@util/extend/data-type/object';
import {getTypedQueryCallback} from '@util/extend/browser/query-string';

export const COURSE_PAGINATION_CONFIG: MultiplePagesPaginationConfig = {
  articlePerPage: 20,
  pagePerView: 5
};

export const COURSE_SORT = itemListToDataOfType([
  {value: 'start-asc', name: '시작시간 오름차순'},
  {value: 'start-desc', name: '시작시간 내림차순'},
  {value: 'room-asc', name: '강의실 오름차순'},
  {value: 'room-desc', name: '강의실 내림차순'},
]);

type CourseQueryStringKey = 'page' | 'sort' | 'room';
type CourseParamKey = 'topic';

export const getCourseQuery = getTypedQueryCallback<CourseQueryStringKey, CourseParamKey>();

// course 페이지를 컨트롤 (query-string 기반으로 페이지이동, 필터, 정렬 등)하기위한 공통 hooks
export function useCourseQueryString() {
  const query = getCourseQuery(useRouter().query);
  const {replaceKeepQuery, getKeepQuery} = useKeepQuery<CourseQueryStringKey, CourseParamKey>();

  //모든 쿼리스트링 유효성검증은 getSSR에서 진행
  const currentPage = Number(query.page) as number;
  const currentSort = query.sort as CourseSortType | undefined;

  const currentTopic = Number(query.topic);
  const currentRoom = query.room === undefined ? undefined : Number(query.room);

  const applyFilterTopic = useCallback((pk: number) => {
    replaceKeepQuery({
      page: 1,
      room: undefined,
      sort: undefined
    }, {
      topic: pk,
    });
  }, [replaceKeepQuery]);

  const applyFilterRoom = useCallback((pk: number | undefined) => {
    replaceKeepQuery({
      room: pk,
      page: 1
    });
  }, [replaceKeepQuery]);

  const reset = useCallback(() => {
    replaceKeepQuery({
      room: undefined,
      sort: undefined,
      page: 1
    });
  }, [replaceKeepQuery]);

  const onSort = useCallback((sort?: CourseSortType) => {
    replaceKeepQuery({
      sort,
      page: 1
    });
  }, [replaceKeepQuery]);

  const pageToHref = useCallback((page: number) => {
    return getKeepQuery({
      page
    });
  }, [getKeepQuery]);

  const onClickPage = useCallback((page: number) => {
    replaceKeepQuery({
      page
    });
  }, [replaceKeepQuery]);

  return {
    currentPage,
    currentSort,
    currentTopic,
    currentRoom,
    applyFilterRoom,
    applyFilterTopic,
    onSort,
    pageToHref,
    onClickPage,
    reset
  };
}
