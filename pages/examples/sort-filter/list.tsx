import React, {useCallback} from 'react';
import {handleServerSideError} from '@util/handle-error/server-side-error';
import type {GetServerSideProps} from 'next';
import {validateNumberInQueryThrowError, validSortInQuery} from '@util/extend/query-string';
import {COURSE_ORDERBY} from '@util/services/course';
import CourseTable, {CourseTableProp} from '@component/molecules/course/CourseTable';
import CourseApi from '@api/CourseApi';
import CourseFilterMenu from '@component/molecules/course/CourseFilterMenu';
import CourseSortMenu from '@component/molecules/course/CourseSortMenu';
import styled from 'styled-components';
import {useKeepQuery} from '@util/extend/router';

export default function Page({listResponse}: CourseTableProp) {
  const {push} = useKeepQuery();

  const reset = useCallback(() => {
    push({
      topic: undefined,
      room: undefined,
      orderby: undefined,
      direction: undefined
    });
  }, [push]);

  return (
    <>
      <CourseFilterMenu/>
      <CourseSortMenu/>
      <ResetButton onClick={reset}>reset</ResetButton>
      <CourseTable listResponse={listResponse}/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CourseTableProp> = async ({query}) => {
  try {
    const page = validateNumberInQueryThrowError(query.page);

    //filter
    const topic = !query.topic ? undefined : validateNumberInQueryThrowError(query.topic);
    const room = !query.room ? undefined : validateNumberInQueryThrowError(query.room);

    //sort
    const {orderby, direction} = validSortInQuery({orderby: query.orderby, direction: query.direction, orderbys: COURSE_ORDERBY});

    const api = new CourseApi();
    const {data: listResponse} = await api.getList(page, {room, topic, orderby, direction});

    return {
      props: {
        listResponse
      }
    };

  } catch (error) {
    return handleServerSideError(error, {
      notifyRedirect: {
        destination: '/examples/sort-filter/list?page=1'
      }
    });
  }
}

const ResetButton = styled.button`
  display: block;
  margin: 1px;
  background: lightgray;
`;
