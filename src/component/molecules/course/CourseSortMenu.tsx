import React from 'react';
import {COURSE_SORT_ITEMS, useCourseUIControl} from '@util/services/course';
import styled from 'styled-components';
import {myClassName} from '@util/libraries/classnames';

export interface CourseSortMenuProp {

}

export default function CourseSortMenu({}: CourseSortMenuProp) {
  const {onSort, currentSort} = useCourseUIControl();

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
