import React, {useState} from 'react';
import styled from 'styled-components';
import CourseFilterMenu from '@component/molecules/course/CourseFilterMenu';
import CourseSortMenu from '@component/molecules/course/CourseSortMenu';
import {useCourseQueryString} from '@util/services/course';
import CourseTopicMenu from '@component/molecules/course/CourseTopicMenu';

export interface CourseMenuProp {

}

export default function CourseMenu({}: CourseMenuProp) {
  const [readyToFilter, setReadyToFilter] = useState(false);
  const {reset} = useCourseQueryString();

  return (
    <>
      <CourseTopicMenu/>
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
