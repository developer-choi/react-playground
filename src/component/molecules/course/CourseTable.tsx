import React, {useCallback} from 'react';
import styled from 'styled-components';
import type {CourseListResponse} from '@type/response/course';
import moment from 'moment';
import BasicPagination from '@component/molecules/pagination/BasicPagination';
import {useRouter} from 'next/router';
import {COURSE_PAGINATION_CONFIG} from '@util/services/course';
import ShortPagination from '@component/molecules/pagination/ShortPagination';
import NearPagination from '@component/molecules/pagination/NearPagination';

export interface CourseTableProp {
  listResponse: CourseListResponse;
}

export default function CourseTable({listResponse}: CourseTableProp) {
  const {query, push} = useRouter();
  const {page, ...restQuery} = query;
  const currentPage = Number(page);

  const pageToHref = useCallback((page: number) => {
    return {
      pathname: `/feature/sort-filter/list`,
      query: {...restQuery, page}
    };
  }, [restQuery]);

  const onClickPage = useCallback((page: number) => {
    push(pageToHref(page));
  }, [pageToHref, push]);

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

      <BasicPagination
        methods={{pageToHref}}
        currentPage={currentPage}
        total={listResponse.total}
        config={COURSE_PAGINATION_CONFIG}
      />

      <ShortPagination
        methods={{onClickPage}}
        currentPage={currentPage}
        total={listResponse.total}
        config={COURSE_PAGINATION_CONFIG}
      />

      <NearPagination
        methods={{onClickPage}}
        currentPage={currentPage}
        total={listResponse.total}
        config={COURSE_PAGINATION_CONFIG}
      />

      <NearPagination
        methods={{onClickPage}}
        currentPage={currentPage}
        total={listResponse.total}
        config={{articlePerPage: COURSE_PAGINATION_CONFIG.articlePerPage, pagePerView: 7}}
      />
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
