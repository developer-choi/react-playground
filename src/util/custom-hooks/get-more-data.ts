import {useCallback, useState} from 'react';
import type {PagingResponse} from '@type/response/common';
import {handleClientSideError} from '@util/handle-error/client-side-error';
import {useEffectFromTheSecondTime} from '@util/custom-hooks/useEffectFromTheSecondTime';

export type UseGetMoreDataServerSideParam<T> = Required<UseGetMoreDataParam<T>>;
export type UseGetMoreDataServerSideResult<T> = Omit<UseGetMoreDataResult<T>, 'setInitialData'>;

export function useGetMoreDataServerSide<T>({initialData, getApiHandler}: UseGetMoreDataServerSideParam<T>): UseGetMoreDataServerSideResult<T> {
  const {list, total, setMoreData, haveMoreData} = useGetMoreData({initialData, getApiHandler});

  return {
    list, total, setMoreData, haveMoreData
  };
}

export type UseGetMoreDataClientSideParam<T> = Pick<UseGetMoreDataParam<T>, 'getApiHandler'>;
export type UseGetMoreDataClientSideResult<T> = UseGetMoreDataResult<T>;

export function useGetMoreDataClientSide<T>({getApiHandler}: UseGetMoreDataClientSideParam<T>): UseGetMoreDataClientSideResult<T> {
  const {list, total, setInitialData, setMoreData, haveMoreData} = useGetMoreData({getApiHandler});

  return {
    list, total, setInitialData, setMoreData, haveMoreData
  };
}

interface UseGetMoreDataParam<T> {
  initialData?: {
    list: T[];
    total: number;
  };
  getApiHandler: GetMoreDataApiHandler<T>;
}

interface UseGetMoreDataResult<T> {
  list: T[];
  total: number;
  setInitialData: () => Promise<void>;
  setMoreData: () => Promise<void>;
  haveMoreData: boolean;
}

function useGetMoreData<T>({initialData, getApiHandler}: UseGetMoreDataParam<T>): UseGetMoreDataResult<T> {
  const [{page, list, total}, setData] = useState<Data<T>>(() => {
    return initialize(initialData);
  });
  
  useEffectFromTheSecondTime(useCallback(() => {
    setData(initialize(initialData));
  }, [initialData]));
  
  const setInitialData = useCallback(async () => {
    try {
      const response = await getApiHandler(1);
      setData({
        list: response.list,
        total: response.total,
        page: 1
      });
    } catch (error) {
      handleClientSideError(error);
    }
  }, [getApiHandler]);
  
  const setMoreData = useCallback(async () => {
    try {
      const response = await getApiHandler(page + 1);
      setData(prevState => ({
        list: prevState.list.concat(response.list),
        page: page + 1,
        total: response.total
      }));
    } catch (error) {
      handleClientSideError(error);
    }
  }, [getApiHandler, page]);
  
  const haveMoreData = list.length < total;
  
  return {
    list,
    total,
    setInitialData,
    setMoreData,
    haveMoreData
  };
}

function initialize<T>(data: UseGetMoreDataParam<T>['initialData']): Data<T> {
  if (!data) {
    return INITIAL_DATA;
  }
  
  return {
    ...data, page: 1
  };
}

const INITIAL_DATA = {
  page: 1, list: [], total: 0
};

export type GetMoreDataApiHandler<T> = (page: number) => Promise<({ list: T[], total: number })>;

interface Data<T> extends PagingResponse {
  list: T[];
}
