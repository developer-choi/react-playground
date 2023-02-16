import React from 'react';
import {COURSE_SORT, useCourseUIControl} from '@util/services/course';
import styled from 'styled-components';
import {myClassName} from '@util/libraries/classnames';

export interface CourseSortMenuProp {

}

export default function CourseSortMenu({}: CourseSortMenuProp) {
  const {onSort, currentSort} = useCourseUIControl();

  return (
    <>
      {COURSE_SORT.itemList.map(({value, name}) => (
        <SortButton key={value} type="button" className={myClassName({active: value === currentSort})} onClick={() => onSort(value)}>
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
