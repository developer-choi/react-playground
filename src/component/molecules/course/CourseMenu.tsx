import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import CourseFilterMenu from '@component/molecules/course/CourseFilterMenu';
import CourseSortMenu from '@component/molecules/course/CourseSortMenu';
import {useKeepQueryCourse} from '@util/services/course';

export interface CourseMenuProp {

}

export default function CourseMenu({}: CourseMenuProp) {
  const {pushFilterOrSort} = useKeepQueryCourse();
  const [readyToFilter, setReadyToFilter] = useState(false);

  const reset = useCallback(() => {
    pushFilterOrSort({
      topic: undefined,
      room: undefined,
      sort: undefined
    });
  }, [pushFilterOrSort]);

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
