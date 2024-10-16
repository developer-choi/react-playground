'use client';

import {useInfiniteQuery} from '@tanstack/react-query';
import {getTestPlainListApi} from '@/utils/service/api/test';
import {useInfiniteScroll} from '@/utils/extend/browser/useInfiniteScroll';
import styles from './index.module.scss';

export default function InfiniteScrollClientList() {
  const queryResult = useListQuery();

  useInfiniteScroll({
    queryResult,
    listSelector: '#list-selector'
  });

  return (
    <div id="list-selector">
      {queryResult.data?.pages.map(({list}) => list.map(({pk, title}) => (
        <div key={pk} className={styles.box}>
          {title}
        </div>
      )))}
    </div>
  );
}


function useListQuery() {
  // Doc : [How to customize gcTime] https://docs.google.com/document/d/1Jy8i1g2i9ekNSRELs_PePs609rASovIJvSzS-W9y6Wc/edit
  return useInfiniteQuery({
    queryKey: ['list'],
    queryFn: function ({pageParam}) {
      return getTestPlainListApi(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: function (_1, _2, lastPageParam) {
      return lastPageParam + 1;
    },
    gcTime: 1000 * 60 * 10, // Point 2. gcTime을 여기에서도 지정 > https://github.com/TanStack/query/issues/8136#issuecomment-2396908483 에서는 안알려주지만 이것도 같이 써야함.
    staleTime: Infinity // Point 3. staleTime을 gcTime보다 길게 해서, gcTime으로 캐시 최신화를 조절.
  });
}
