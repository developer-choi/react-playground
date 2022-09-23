import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import CourseApi from '@api/CourseApi';
import {handleClientSideError} from '@util/handle-error/client-side-error';
import {cleanQuery} from '@util/extend/query-string';
import FilterButton from '@component/atom/FilterButton';
import type {Room, Topic} from '@type/response-sub/course-sub';

export interface CourseFilterMenuProp {

}

export default function CourseFilterMenu({}: CourseFilterMenuProp) {
  const [filterInfo, setFilterInfo] = useState<{topics: Topic[]; rooms: Room[];}>();
  const {push, query} = useRouter();
  const topic = Number(query.topic);
  const room = Number(query.room);

  useEffect(() => {
    (async () => {
      const api = new CourseApi();
      try {
        const [{data: {list: topics}}, {data: {list: rooms}}] = await Promise.all([api.getTopics(), api.getRooms()]);
        setFilterInfo({topics, rooms});

      } catch (error) {
        handleClientSideError(error);
      }
    })().then();
  }, []);

  const filterTopic = useCallback((pk: number | undefined) => {
    const _query = cleanQuery({
      ...query,
      room,
      topic: pk,
    });

    push({
      pathname: '/examples/sort-filter/list',
      query: _query
    }).then();
  }, [push, query, room]);

  const filterRoom = useCallback((pk: number | undefined) => {
    const _query = cleanQuery({
      ...query,
      topic,
      room: pk
    });

    push({
      pathname: '/examples/sort-filter/list',
      query: _query
    }).then();
  }, [push, query, topic]);

  const reset = useCallback(() => {
    const _query = cleanQuery({
      ...query,
      topic: undefined,
      room: undefined
    });

    push({
      pathname: '/examples/sort-filter/list',
      query: _query
    }).then();
  }, [push, query]);

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
      <div>
      </div>
      <button onClick={reset}>필터초기화</button>
    </Wrap>
  );
}

const Wrap = styled.div`

`;
