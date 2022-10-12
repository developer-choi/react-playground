import React from 'react';
import styled from 'styled-components';
import type {CourseListResponse} from '@type/response/course';
import moment from 'moment';
import Pagination from '@component/molecules/Pagination';
import {useRouter} from 'next/router';
import {COURSE_LIST_ARTICLE_PER_PAGE, COURSE_LIST_PAGE_PER_VIEW} from '@util/services/course';

export interface CourseTableProp {
  listResponse: CourseListResponse;
}

export default function CourseTable({listResponse}: CourseTableProp) {
  const {query} = useRouter();
  const page = Number(query.page);

  return (
    <>
      <Table>
        <thead>
        <tr>
          <td>제목</td>
          <td>과목</td>
          <td>선생님</td>
          <td>강의실</td>
          <td>시작시간</td>
        </tr>
        </thead>

        <tbody>
        {listResponse.list.map(({pk, title, topic, teacher, room, startTimestamp}) => (
          <tr key={pk}>
            <td>{title}</td>
            <td>{topic.name}</td>
            <td>{teacher.name}</td>
            <td>{room.name}</td>
            <td>{moment(startTimestamp).format('YYYY-MM-DD HH:mm')}</td>
          </tr>
        ))}
        </tbody>
      </Table>

      <Pagination currentPage={page} total={listResponse.total} pagePerView={COURSE_LIST_PAGE_PER_VIEW} articlePerPage={COURSE_LIST_ARTICLE_PER_PAGE}/>
    </>
  );
}

const Table = styled.table`
  thead {
    tr {
      background: yellow;
    }
  }
  
  td {
    padding: 8px;
    border: 1px solid black;
  }
`;
