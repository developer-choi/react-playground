import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import FilterButton from '@component/atom/forms/FilterButton';
import type {Room} from '@type/response-sub/course-sub';
import {useCourseQueryString} from '@util/services/course';
import {getCourseRoomsApi} from '@api/course-api';
import {useHandleClientSideError} from "@util/services/handle-error/client-side-error";

export interface CourseFilterMenuProp {
  onReadyToFilter: (ready: boolean) => void;
}

export default function CourseFilterMenu({onReadyToFilter}: CourseFilterMenuProp) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const {currentRoom, applyFilterRoom} = useCourseQueryString();
  const handleClientSideError = useHandleClientSideError();

  useEffect(() => {
    (async () => {
      try {
        const {list} = await getCourseRoomsApi();
        setRooms(list);
        onReadyToFilter(true);

      } catch (error) {
        handleClientSideError(error);
      }
    })().then();
  }, [handleClientSideError, onReadyToFilter]);

  if (!rooms) {
    return null;
  }

  return (
    <Wrap>
      <div>
        {rooms.map(({pk, name}) => (
          <FilterButton currentFilter={currentRoom} key={pk} onFilter={applyFilterRoom} value={pk}>{name}</FilterButton>
        ))}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

`;
