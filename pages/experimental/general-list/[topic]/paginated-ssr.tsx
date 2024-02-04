import React from 'react';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import type {GetServerSideProps} from 'next';
import {COURSE_SORT, getCourseQuery} from '@util/services/course';
import CourseTable, {CourseTableProp} from '@component/molecules/course/CourseTable';
import CourseMenu from '@component/molecules/course/CourseMenu';
import {validateIncludeString, validateNumber} from '@util/extend/browser/query-string';
import {getCourseListApi} from '@api/course-api';

// URL: http://localhost:3000/experimental/general-list/1/paginated-ssr?page=1
export default function Page({listResponse}: CourseTableProp) {
  return (
    <>
      <CourseMenu/>
      <CourseTable listResponse={listResponse}/>
    </>
  );
}

type ParamType = {
  topic: string;
};

export const getServerSideProps: GetServerSideProps<CourseTableProp, ParamType> = async (context) => {
  try {
    const query = getCourseQuery(context.query);

    const page = validateNumber(query.page);
    const topic = validateNumber(context.params?.topic);
    const room = validateNumber(query.room, {required: false})
    const sort = validateIncludeString(query.sort, COURSE_SORT.typeList, {required: false});

    const listResponse = await getCourseListApi({page, room, topic, sort});

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
