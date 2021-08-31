import React, {useCallback} from 'react';
import Head from 'next/head';
import type {PagingListType} from '../../api/paging';
import type {GetServerSideProps} from 'next';
import styled from 'styled-components';
import useInfiniteScroll from '../../../src/utils/custom-hooks/useInfiniteScroll';
import PagingApi from '../../../src/api/PagingApi';

interface PageProp {
  list: PagingListType[];
  total: number;
}

export default function InfiniteScrollPage(props: PageProp) {
  
  const fetchMoreApi = useCallback(async (requestPage: number) => {
    const api = new PagingApi();
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
    <>
      <Head>
        <title>infinite-scroll</title>
      </Head>
      <div>
        {list.map(({key, order, color}) => (
          <Row key={key} style={{backgroundColor: color}}>{order}th row</Row>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const api = new PagingApi();
  const {list, total} = (await api.getList(1)).data;
  return {
    props: {
      list,
      total
    }
  };
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  height: 150px;
  font-size: 25px;
  font-weight: bold;
  color: black;
`;
