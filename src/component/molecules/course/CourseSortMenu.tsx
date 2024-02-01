import React from "react";
import {COURSE_SORT, useCourseQueryString} from "@util/services/course";
import styled from "styled-components";
import classNames from "classnames";

export interface CourseSortMenuProp {}

export default function CourseSortMenu({}: CourseSortMenuProp) {
  const {onSort, currentSort} = useCourseQueryString();

  return (
    <>
      {COURSE_SORT.itemList.map(({value, name}) => (
        <SortButton key={value} type="button" className={classNames({active: value === currentSort})} onClick={() => onSort(value)}>
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
    background-color: ${(props) => props.theme.main};
  }
`;
