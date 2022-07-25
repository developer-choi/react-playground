import React, {useCallback} from 'react';
import Head from 'next/head';
import type {PagingListType} from '@pages/api/paging';
import type {GetServerSideProps} from 'next';
import styled from 'styled-components';
import useInfiniteScroll from '@util/custom-hooks/useInfiniteScroll';
import PagingApi from '@api/PagingApi';

interface PageProp {
  list: PagingListType[];
  total: number;
}

export default function InfiniteScrollPage(props: PageProp) {
  
  const fetchMoreApi = useCallback(async (requestPage: number) => {
    const api = new PagingApi();
    const {list, total} = (await api.getPaging(requestPage)).data;
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
    <>
      <Head>
        <title>infinite-scroll</title>
      </Head>
      <div>
        {list.map(({key, order, color}) => (
          <InfiniteScrollRow key={key} style={{backgroundColor: color}}>{order}th row</InfiniteScrollRow>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const api = new PagingApi();
   const {list, total} = (await api.getPaging(1)).data;
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
  color: black;
`;
