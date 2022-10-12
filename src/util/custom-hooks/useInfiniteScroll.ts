import {useEffect, useState} from 'react';
import {getTotalPage} from '@util/paging';
import throttle from 'lodash/throttle';

export interface ListData<T> {
  total: number;
  list: T[];
}

export interface InfiniteScrollParam<T> {
  initialData?: ListData<T>;
  articlePerPage: number;
  fetchMoreApi: (requestPage: number) => Promise<ListData<T>>;
}

export default function useInfiniteScroll<T>({initialData, fetchMoreApi, articlePerPage}: InfiniteScrollParam<T>) {
  const [pagingData, setPagingData] = useState({
    loading: false,
    list: initialData?.list ?? [],
    total: initialData?.total ?? 0,
    page: 1
  });

  const {total, loading, list, page} = pagingData;

  useEffect(() => {
    const totalPage = getTotalPage({total, articlePerPage});

    if (page >= totalPage && loading) {
      return;
    }

    const handler = throttle(() => {
      const {clientHeight, scrollHeight, scrollTop} = document.documentElement;

      if ((scrollHeight - clientHeight - scrollTop) < 500) {

        (async () => {
          if(loading) {
            return;
          }

          try {
            const nextPage = page + 1;

            setPagingData(({loading, ...rest}) => ({
              loading: true,
              ...rest
            }));

            const {total, list} = await fetchMoreApi(nextPage);

            setPagingData(prevState => ({
              page: nextPage,
              total,
              list: prevState.list.concat(list),
              loading: false
            }));

          } catch (error) {
            console.error(error);
          }
        })().then();
      }
    }, 200);

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [articlePerPage, fetchMoreApi, loading, page, total]);

  return {
    total, loading, list, page
  };
}
