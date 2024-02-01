import React from "react";
import {handleServerSideError} from "@util/services/handle-error/server-side-error";
import type {GetServerSideProps} from "next";
import {COURSE_SORT, getCourseQuery, useCourseList} from "@util/services/course";
import CourseTable from "@component/molecules/course/CourseTable";
import CourseMenu from "@component/molecules/course/CourseMenu";
import {validateIncludeString, validateNumber} from "@util/extend/browser/query-string";
import styled from "styled-components";
import {flexCenter} from "@util/services/style/css";

// URL: http://localhost:3000/experimental/general-list/1/paginated-csr?page=1
export default function Page() {
  const {data} = useCourseList();

  if (!data) {
    //여기서 Loading UI 노출
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      <CourseMenu />
      <CourseTable listResponse={data} />
    </>
  );
}

const Loading = styled.div`
  height: 100vh;
  ${flexCenter};
  font-size: 40px;
  font-weight: bold;
`;

type ParamType = {
  topic: string;
};

export const getServerSideProps: GetServerSideProps<{}, ParamType> = async (context) => {
  try {
    const query = getCourseQuery(context.query);

    validateNumber(query.page);
    validateNumber(context.params?.topic);
    validateNumber(query.room, {required: false});
    validateIncludeString(query.sort, COURSE_SORT.typeList, {required: false});

    return {
      props: {}
    };
  } catch (error) {
    return handleServerSideError(error, {
      notifyRedirect: {
        destination: "/solution/general-list/paginated?page=1"
      }
    });
  }
};
