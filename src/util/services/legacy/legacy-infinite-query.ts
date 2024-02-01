import {useCallback, useMemo, useState} from "react";
import {getTotalPage} from "@util/services/pagination/pagination-core";
import {useInfiniteScroll} from "@util/extend/event/scroll";

interface ListData<T> {
  total: number;
  list: T[];
}

interface InfiniteQueryParam<T> {
  initialData?: ListData<T>;
  articlePerPage: number;
  fetchMoreApi: (requestPage: number) => Promise<ListData<T>>;
}

export default function useLegacyInfiniteQuery<T>({initialData, fetchMoreApi, articlePerPage}: InfiniteQueryParam<T>) {
  const [pagingData, setPagingData] = useState({
    loading: false,
    list: initialData?.list ?? [],
    total: initialData?.total ?? 0,
    page: 1
  });

  const {total, loading, list, page} = pagingData;

  const callback = useCallback(async () => {
    try {
      const nextPage = page + 1;

      setPagingData(({loading, ...rest}) => ({
        loading: true,
        ...rest
      }));

      const {total, list} = await fetchMoreApi(nextPage);

      setPagingData((prevState) => ({
        page: nextPage,
        total,
        list: prevState.list.concat(list),
        loading: false
      }));
    } catch (error) {
      console.error(error);
    }
  }, [fetchMoreApi, page]);

  const enabled = useMemo(() => {
    const totalPage = getTotalPage({total, articlePerPage});
    return page < totalPage && !loading;
  }, [articlePerPage, loading, page, total]);

  useInfiniteScroll({
    enabled,
    offset: 500,
    callback
  });

  return {
    total,
    loading,
    list,
    page
  };
}
