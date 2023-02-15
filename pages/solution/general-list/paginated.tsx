import React from 'react';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import type {GetServerSideProps} from 'next';
import {validateNumberInQueryThrowError, validateStringIncludes} from '@util/extend/browser/query-string';
import {COURSE_SORT_TYPES} from '@util/services/course';
import CourseTable, {CourseTableProp} from '@component/molecules/course/CourseTable';
import CourseApi from '@api/CourseApi';
import CourseMenu from '@component/molecules/course/CourseMenu';

// URL: http://localhost:3000/solution/general-list/paginated
export default function Page({listResponse}: CourseTableProp) {
  return (
    <>
      <CourseMenu/>
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
        destination: '/solution/general-list/paginated?page=1'
      }
    });
  }
}
