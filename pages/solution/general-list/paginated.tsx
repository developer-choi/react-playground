import React from 'react';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import type {GetServerSideProps} from 'next';
import {COURSE_SORT, getCourseQuery} from '@util/services/course';
import CourseTable, {CourseTableProp} from '@component/molecules/course/CourseTable';
import CourseApi from '@api/CourseApi';
import CourseMenu from '@component/molecules/course/CourseMenu';
import {validateIncludeString, validateNumber} from '@util/extend/browser/query-string';

// URL: http://localhost:3000/solution/general-list/paginated
export default function Page({listResponse}: CourseTableProp) {
  return (
    <>
      <CourseMenu/>
      <CourseTable listResponse={listResponse}/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CourseTableProp> = async (context) => {
  try {
    const query = getCourseQuery(context.query);

    const page = validateNumber(query.page);

    //filter
    const topic = validateNumber(query.topic, {required: false});
    const room = validateNumber(query.room, {required: false})

    const sort = validateIncludeString(query.sort, COURSE_SORT.typeList, {required: false});

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
