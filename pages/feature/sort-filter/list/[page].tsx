import React from 'react';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import type {GetServerSideProps} from 'next';
import {validateNumberInQueryThrowError, validateStringIncludes} from '@util/extend/query-string';
import {COURSE_SORT_TYPES} from '@util/services/course';
import CourseTable, {CourseTableProp} from '@component/molecules/course/CourseTable';
import CourseApi from '@api/CourseApi';
import CourseMenu from '@component/molecules/course/CourseMenu';

export default function Page({listResponse}: CourseTableProp) {
  return (
    <>
      <CourseMenu/>
      <CourseTable listResponse={listResponse}/>
    </>
  );
}

type ParamType = {
  page: string;
};

export const getServerSideProps: GetServerSideProps<CourseTableProp, ParamType> = async ({params, query}) => {
  try {
    const page = validateNumberInQueryThrowError(params?.page);

    //filter
    const topic = !query.topic ? undefined : validateNumberInQueryThrowError(query.topic);
    const room = !query.room ? undefined : validateNumberInQueryThrowError(query.room);

    const sort = validateStringIncludes(query.sort, COURSE_SORT_TYPES, false);

    const api = new CourseApi();
    const {data: listResponse} = await api.getList(page, {room, topic, sort});

    return {
      props: {
        listResponse
      }
    };

  } catch (error) {
    return handleServerSideError(error, {
      notifyRedirect: {
        destination: '/feature/sort-filter/list/1'
      }
    });
  }
}
