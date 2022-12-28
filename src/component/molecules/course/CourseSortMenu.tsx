import React, {useCallback} from 'react';
import {useRouter} from 'next/router';
import type {CourseSortType} from '@type/response-sub/course-sub';
import {COURSE_SORT_ITEMS, useKeepQueryCourse} from '@util/services/course';
import styled from 'styled-components';
import {myClassName} from '@util/libraries/classnames';

export interface CourseSortMenuProp {

}

export default function CourseSortMenu({}: CourseSortMenuProp) {
  const {query} = useRouter();
  const {pushFilterOrSort} = useKeepQueryCourse();

  const currentSort = query.sort as CourseSortType;

  const onSort = useCallback((sort?: CourseSortType) => {
    pushFilterOrSort({
      sort
    });
  }, [pushFilterOrSort]);

  return (
    <>
      {COURSE_SORT_ITEMS.map(({sort, name}) => (
        <SortButton key={sort} type="button" className={myClassName({active: sort === currentSort})} onClick={() => onSort(sort)}>
          {name}
        </SortButton>
      ))}
    </>
  );
}

const SortButton = styled.button`
  margin: 1px;
  background-color: lightgray;
  
  &.active {
    background-color: ${props => props.theme.main};
  }
`;
