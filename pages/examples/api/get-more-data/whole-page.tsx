import React, {useCallback, useState} from 'react';
import type {GetServerSideProps} from 'next';
import PagingApi, {PagingListResponse} from '@api/PagingApi';
import {InfiniteScrollRow} from '@pages/examples/api/infinite-scroll';
import {handleErrorInClientSide} from '@util/api/client-side-error';
import {Button} from '@component/atom/button/button-presets';
import {useEffectFromTheSecondTime} from '@util/custom-hooks/useEffectFromTheSecondTime';

export default function Page(props: PagingListResponse) {
  const [data, setData] = useState<PagingListResponse>(props);
  const [page, setPage] = useState(1);
  
  const fetchMoreData = useCallback(async () => {
    setPage(prevState => prevState + 1);
  }, []);
  
  useEffectFromTheSecondTime(useCallback(() => {
    (async () => {
      const pagingApi = new PagingApi();
  
      try {
        const response = await pagingApi.getList(page);
        setData(prevState => ({
          total: response.data.total,
          list: prevState.list.concat(response.data.list)
        }));
      } catch (error) {
        handleErrorInClientSide(error);
      }
    })().then();
  }, [page]));
  
  const {list, total} = data;
  const haveMoreData = list.length < total;
  
  return (
    <>
      {list.map(({key, color, order}) =>
        <InfiniteScrollRow key={key} style={{backgroundColor: color}}>{order}</InfiniteScrollRow>
      )}
      {haveMoreData && <Button onClick={fetchMoreData}>더보기</Button>}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PagingListResponse> = async () => {
  const pagingApi = new PagingApi();
  const {data} = await pagingApi.getList(1);
  
  return {
    props: {
      list: data.list,
      total: data.total
    }
  };
};
