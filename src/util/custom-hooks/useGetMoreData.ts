import {useCallback, useState} from 'react';
import type {PagingResponse} from '@type/response/common';
import {handleErrorInClientSide} from '@util/api/client-side-error';

export interface UseGetMoreDataParam<T> {
  initialData?: {
    list: T[];
    total: number;
  };
  getApiHandler: GetMoreDataApiHandler<T>;
}

export interface UseGetMoreDataResult<T> {
  list: T[];
  total: number;
  getInitialData: () => Promise<void>;
  getMoreData: () => Promise<void>;
  haveMoreData: boolean;
}

export default function useGetMoreData<T>({initialData, getApiHandler}: UseGetMoreDataParam<T>): UseGetMoreDataResult<T> {
  const [{page, list, total}, setData] = useState<Data<T>>(initialData ? {...initialData, page: 1} : INITIAL_DATA);
  
  const getInitialData = useCallback(async () => {
    try {
      const response = await getApiHandler(1);
      setData({
        list: response.list,
        total: response.total,
        page: 1
      });
    } catch (error) {
      handleErrorInClientSide(error);
    }
  }, [getApiHandler]);
  
  const getMoreData = useCallback(async () => {
    try {
      const response = await getApiHandler(page + 1);
      setData(prevState => ({
        list: prevState.list.concat(response.list),
        page: page + 1,
        total: response.total
      }));
    } catch (error) {
      handleErrorInClientSide(error);
    }
  }, [getApiHandler, page]);
  
  const haveMoreData = list.length < total;
  
  return {
    list,
    total,
    getInitialData,
    getMoreData,
    haveMoreData
  };
};

const INITIAL_DATA = {
  page: 1, list: [], total: 0
};

export type GetMoreDataApiHandler<T> = (page: number) => Promise<({ list: T[], total: number })>;

interface Data<T> extends PagingResponse {
  list: T[];
}
