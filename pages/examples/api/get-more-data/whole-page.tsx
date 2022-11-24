import React, {useCallback} from 'react';
import type {GetServerSideProps} from 'next';
import PagingApi, {PagingListResponse} from '@api/PagingApi';
import {InfiniteScrollRow} from '@pages/examples/api/infinite-scroll';
import Button from '@component/atom/button/Button';
import type {GetMoreDataApiHandler} from '@util/custom-hooks/get-more-data';
import {useGetMoreDataServerSide} from '@util/custom-hooks/get-more-data';
import type {PagingListType} from '@pages/api/paging';

export default function Page(props: PagingListResponse) {
  const getApiHandler = useCallback<GetMoreDataApiHandler<PagingListType>>(async (page) => {
    const api = new PagingApi();
    const {data} = await api.getPaging(page);
    return {
      list: data.list,
      total: data.total
    };
  }, []);
  
  const {list, setMoreData, haveMoreData} = useGetMoreDataServerSide({
    initialData: {
      list: props.list,
      total: props.total
    },
    getApiHandler
  });
  
  return (
    <>
      {list.map(({key, color, order}) =>
        <InfiniteScrollRow key={key} style={{backgroundColor: color}}>{order}</InfiniteScrollRow>
      )}
      {haveMoreData && <Button onClick={setMoreData}>더보기</Button>}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PagingListResponse> = async () => {
  const pagingApi = new PagingApi();
  const {data} = await pagingApi.getPaging(1);
  
  return {
    props: {
      list: data.list,
      total: data.total
    }
  };
};
