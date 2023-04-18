import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import type {Topic} from '@type/response-sub/course-sub';
import {handleClientSideError} from '@util/services/handle-error/client-side-error';
import {useCourseQueryString} from '@util/services/course';
import {myClassName} from '@util/libraries/classnames';
import {getCourseTopicsApi} from '@api/course-api';

export interface CourseTopicMenuProp {

}

export default function CourseTopicMenu({}: CourseTopicMenuProp) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const {currentTopic, applyFilterTopic} = useCourseQueryString();

  useEffect(() => {
    (async () => {
      try {
        const {list} = await getCourseTopicsApi();
        setTopics(list);
      } catch (error) {
        handleClientSideError(error);
      }
    })().then();
  }, []);

  return (
    <Wrap>
      {topics.map(({pk, name}) => (
        <Tab key={pk} onClick={() => applyFilterTopic(pk)} className={myClassName({active: currentTopic === pk})}>{name}</Tab>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
`;

const Tab = styled.button`
  background-color: lightgray;
  
  &.active {
    background-color: orange;
  }
`;
