import React, {useCallback} from 'react';
import type {GetServerSideProps} from 'next';
import styled from 'styled-components';
import useInfiniteScroll from '@util/custom-hooks/useInfiniteScroll';
import CourseApi from '@api/CourseApi';
import type {Course} from '@type/response-sub/course-sub';

interface PageProp {
  list: Course[];
  total: number;
}

export default function InfiniteScrollPage(props: PageProp) {
  const fetchMoreApi = useCallback(async (requestPage: number) => {
    const api = new CourseApi();
    const {list, total} = (await api.getList(requestPage)).data;
    return {list, total};
  }, []);
  
  const {list} = useInfiniteScroll({
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
   const {list, total} = (await api.getList(1)).data;
  return {
    props: {
      list,
      total
    }
  };
}

export const InfiniteScrollRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  height: 100px;
  font-size: 25px;
  font-weight: bold;
`;
