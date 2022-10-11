import React, {useCallback} from 'react';
import {useRouter} from 'next/router';
import type {CourseOrderby} from '@type/response-sub/course-sub';
import type {Direction, Sort} from '@util/custom-hooks/useSort';
import SortButton from '@component/atom/button/SortButton';
import {useKeepQuery} from '@util/extend/router';

export interface CourseSortMenuProp {

}

export default function CourseSortMenu({}: CourseSortMenuProp) {
  const {query} = useRouter();
  const {push} = useKeepQuery();

  const currentSort: Sort<CourseOrderby> | undefined = (!query.orderby || !query.direction) ? undefined : {
    orderby: query.orderby as  CourseOrderby,
    direction: query.direction as Direction
  };

  const onSort = useCallback((sort?: Sort<CourseOrderby>) => {
    push({
      orderby: sort?.orderby,
      direction: sort?.direction
    });
  }, [push]);

  return (
    <>
      <SortButton currentSort={currentSort} orderby="room" onSort={onSort}/>
      <SortButton currentSort={currentSort} orderby="startTimestamp" onSort={onSort}/>
    </>
  );
}
