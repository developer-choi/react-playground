import React, {useCallback} from 'react';
import {useRouter} from 'next/router';
import type {CourseOrderby} from '@type/response-sub/course-sub';
import type {Direction, Sort} from '@util/custom-hooks/useSort';
import {cleanQuery} from '@util/extend/query-string';
import SortButton from '@component/atom/button/SortButton';

export interface CourseSortMenuProp {

}

export default function CourseSortMenu({}: CourseSortMenuProp) {
  const {query, push} = useRouter();
  const currentSort: Sort<CourseOrderby> | undefined = (!query.orderby || !query.direction) ? undefined : {
    orderby: query.orderby as  CourseOrderby,
    direction: query.direction as Direction
  };

  const onSort = useCallback((sort?: Sort<CourseOrderby>) => {
    push({
      pathname: '/examples/sort-filter/list',
      query: cleanQuery({
        ...query,
        orderby: sort?.orderby,
        direction: sort?.direction
      })
    });

  }, [push, query]);

  return (
    <>
      <SortButton currentSort={currentSort} orderby="room" onSort={onSort}/>
      <SortButton currentSort={currentSort} orderby="startTimestamp" onSort={onSort}/>
    </>
  );
}
