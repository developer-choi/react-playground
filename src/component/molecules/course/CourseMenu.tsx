import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import CourseFilterMenu from '@component/molecules/course/CourseFilterMenu';
import CourseSortMenu from '@component/molecules/course/CourseSortMenu';
import {useKeepQuery} from '@util/extend/router';

export interface CourseMenuProp {

}

export default function CourseMenu({}: CourseMenuProp) {
  const {pushKeepQuery} = useKeepQuery();
  const [readyToFilter, setReadyToFilter] = useState(false);

  const reset = useCallback(() => {
    pushKeepQuery({
      topic: undefined,
      room: undefined,
      sort: undefined,
      page: 1
    });
  }, [pushKeepQuery]);

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
