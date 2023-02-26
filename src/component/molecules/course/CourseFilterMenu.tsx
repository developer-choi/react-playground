import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import CourseApi from '@api/CourseApi';
import {handleClientSideError} from '@util/services/handle-error/client-side-error';
import FilterButton from '@component/atom/forms/FilterButton';
import type {Room, Topic} from '@type/response-sub/course-sub';
import {useCourseQueryString} from '@util/services/course';

export interface CourseFilterMenuProp {
  onReadyToFilter: (ready: boolean) => void;
}

export default function CourseFilterMenu({onReadyToFilter}: CourseFilterMenuProp) {
  const [filterInfo, setFilterInfo] = useState<{topics: Topic[]; rooms: Room[];}>();
  const {currentFilter, applyFilterTopic, applyFilterRoom} = useCourseQueryString();

  useEffect(() => {
    (async () => {
      const api = new CourseApi();
      try {
        const [{data: {list: topics}}, {data: {list: rooms}}] = await Promise.all([api.getTopics(), api.getRooms()]);
        setFilterInfo({topics, rooms});
        onReadyToFilter(true);

      } catch (error) {
        handleClientSideError(error);
      }
    })().then();
  }, [onReadyToFilter]);

  if (!filterInfo) {
    return null;
  }

  return (
    <Wrap>
      <div>
        {filterInfo.topics.map(({pk, name}) => (
          <FilterButton currentFilter={currentFilter.topic} key={pk} onFilter={applyFilterTopic} value={pk}>{name}</FilterButton>
        ))}
      </div>
      <div>
        {filterInfo.rooms.map(({pk, name}) => (
          <FilterButton currentFilter={currentFilter.room} key={pk} onFilter={applyFilterRoom} value={pk}>{name}</FilterButton>
        ))}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

`;
