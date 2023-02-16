import type {CourseSortType} from '@type/response-sub/course-sub';
import type {MultiplePagesPaginationConfig} from '@util/services/pagination/pagination-core';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {useKeepQuery} from '@util/extend/router';
import {itemListToDataOfType} from '@util/extend/data-type/object';

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

// course 페이지를 컨트롤 (query-string 기반으로 페이지이동, 필터, 정렬 등)하기위한 공통 hooks
export function useCourseUIControl() {
  const {query} = useRouter();
  const {replaceKeepQuery, getKeepQuery} = useKeepQuery();

  //모든 쿼리스트링 유효성검증은 getSSR에서 진행
  const currentPage = Number(query.page) as number;
  const currentSort = query.sort as CourseSortType | undefined;

  const topic = query.topic === undefined ? undefined : Number(query.topic);
  const room = query.room === undefined ? undefined : Number(query.room);
  const currentFilter = {
    topic,
    room
  };

  const applyFilterTopic = useCallback((pk: number | undefined) => {
    replaceKeepQuery({
      topic: pk,
      page: 1
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
      topic: undefined,
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
    currentFilter,
    applyFilterRoom,
    applyFilterTopic,
    onSort,
    pageToHref,
    onClickPage,
    reset
  };
}
