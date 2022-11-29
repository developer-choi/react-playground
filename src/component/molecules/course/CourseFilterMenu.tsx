import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import CourseApi from '@api/CourseApi';
import {handleClientSideError} from '@util/services/handle-error/client-side-error';
import FilterButton from '@component/atom/FilterButton';
import type {Room, Topic} from '@type/response-sub/course-sub';
import {useKeepQuery} from '@util/extend/router';

export interface CourseFilterMenuProp {
  onReadyToFilter: (ready: boolean) => void;
}

export default function CourseFilterMenu({onReadyToFilter}: CourseFilterMenuProp) {
  const [filterInfo, setFilterInfo] = useState<{topics: Topic[]; rooms: Room[];}>();
  const {query} = useRouter();
  const topic = Number(query.topic);
  const room = Number(query.room);
  const {pushKeepQuery} = useKeepQuery();

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

  const filterTopic = useCallback((pk: number | undefined) => {
    pushKeepQuery({
      topic: pk,
      page: 1
    });
  }, [pushKeepQuery]);

  const filterRoom = useCallback((pk: number | undefined) => {
    pushKeepQuery({
      room: pk,
      page: 1
    });
  }, [pushKeepQuery]);

  if (!filterInfo) {
    return null;
  }

  return (
    <Wrap>
      <div>
        {filterInfo.topics.map(({pk, name}) => (
          <FilterButton currentFilter={topic} key={pk} onFilter={filterTopic} value={pk}>{name}</FilterButton>
        ))}
      </div>
      <div>
        {filterInfo.rooms.map(({pk, name}) => (
          <FilterButton currentFilter={room} key={pk} onFilter={filterRoom} value={pk}>{name}</FilterButton>
        ))}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

`;
