import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import CourseFilterMenu from '@component/molecules/course/CourseFilterMenu';
import CourseSortMenu from '@component/molecules/course/CourseSortMenu';
import {useKeepQuery} from '@util/extend/router';

export interface CourseMenuProp {

}

export default function CourseMenu({}: CourseMenuProp) {

  const {push} = useKeepQuery();
  const [readyToFilter, setReadyToFilter] = useState(false);

  const reset = useCallback(() => {
    push({
      topic: undefined,
      room: undefined,
      orderby: undefined,
      direction: undefined
    });
  }, [push]);

  return (
    <>
      <CourseFilterMenu onReadyToFilter={setReadyToFilter}/>
      {readyToFilter && (
        <>
          <CourseSortMenu/>
          <ResetButton onClick={reset}>reset</ResetButton>
        </>
      )}
    </>
  )
}

const ResetButton = styled.button`
  display: block;
  margin: 1px;
  background: lightgray;
`;
