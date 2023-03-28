import Button from '@component/atom/element/Button';
import {useLogWhenRendering} from '@util/extend/test';
import {useCallback, useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';

// URL: http://localhost:3000/study/rq/option/stale-vs-cache
export default function Page() {
  const [page, setPage] = useState(1);

  const increasePage = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const decreasePage = useCallback(() => {
    setPage(prevState => prevState - 1);
  }, []);

  /**
   * 2초 뒤에 탭전환하면, refetch가 발생함. (staleTime 2초)
   * 1초안에 특정페이지로 다시 진입하면 fetch가 발생함. (1페이지 ==> 2페이지 ==> 1페이지 순서대로 1초안에 왔다갔다하면)
   */
  const example1 = useMemo(() => ({
    staleTime: 2000,
    cacheTime: 1000
  }), []);

  const {data} = useQuery({
    queryKey: [QUERY_KEY, page],
    queryFn: () => getApi(page),
    ...example1,
  });

  useLogWhenRendering('re-render', data);

  return (
    <>
      <Button onClick={increasePage}>Next Page</Button>
      <Button onClick={decreasePage}>Previous Page</Button>
    </>
  );
}

const QUERY_KEY = 'react-query/cache-vs-stale';

async function getApi(page: number) {
  console.log('Api called', page);
  return `${page} 데이터`;
}
