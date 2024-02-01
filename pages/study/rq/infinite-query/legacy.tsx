import React, {useCallback} from "react";
import type {GetServerSideProps} from "next";
import styled from "styled-components";
import useLegacyInfiniteQuery from "@util/services/legacy/legacy-infinite-query";
import type {Course} from "@type/response-sub/course-sub";
import {getCourseListApi} from "@api/course-api";

interface PageProp {
  list: Course[];
  total: number;
}

// URL: http://localhost:3000/study/rq/infinite-query/legacy
export default function InfiniteScrollPage(props: PageProp) {
  const fetchMoreApi = useCallback(async (requestPage: number) => {
    const {list, total} = await getCourseListApi({page: requestPage});
    return {list, total};
  }, []);

  const {list} = useLegacyInfiniteQuery({
    fetchMoreApi,
    articlePerPage: 20,
    initialData: {
      total: props.total,
      list: props.list
    }
  });

  return (
    <div>
      {list.map(({pk, title}) => (
        <InfiniteScrollRow key={pk}>{title}</InfiniteScrollRow>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const {list, total} = await getCourseListApi({page: 1});
  return {
    props: {
      list,
      total
    }
  };
};

const InfiniteScrollRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100px;
  font-size: 25px;
  font-weight: bold;
`;
