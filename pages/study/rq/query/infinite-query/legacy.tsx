import React, {useCallback} from 'react';
import type {GetServerSideProps} from 'next';
import styled from 'styled-components';
import useLegacyInfiniteQuery from '@util/services/legacy/legacy-infinite-query';
import CourseApi from '@api/CourseApi';
import type {Course} from '@type/response-sub/course-sub';

interface PageProp {
  list: Course[];
  total: number;
}

// URL: http://localhost:3000/study/rq/query/infinite-query/legacy
export default function InfiniteScrollPage(props: PageProp) {
  const fetchMoreApi = useCallback(async (requestPage: number) => {
    const api = new CourseApi();
    const {list, total} = (await api.getList({page: requestPage})).data;
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
};

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const api = new CourseApi();
   const {list, total} = (await api.getList({page: 1})).data;
  return {
    props: {
      list,
      total
    }
  };
}

const InfiniteScrollRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  height: 100px;
  font-size: 25px;
  font-weight: bold;
`;
