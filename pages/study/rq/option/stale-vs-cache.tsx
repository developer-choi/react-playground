import Button from '@component/atom/element/Button';
import {timeoutPromise, useLogWhenRendering} from '@util/extend/test';
import {useCallback, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useForceReRender} from '@util/extend/react';

interface Example {
  staleTime: number;
  cacheTime: number;
  TTFB: number;
}

/** Flow1
 * 5초 뒤에 탭전환하면, refetch가 발생함. (staleTime 5초)
 * 하지만, 1초뒤에 탭전환 해도 refetch는 발생하지않음. (cacheTime은 1초로 설정되어있으나)
 */
const example1 = {
  staleTime: 5000,
  cacheTime: 1000,
  TTFB: 0
};

const example: Example = example1;

// URL: http://localhost:3000/study/rq/option/stale-vs-cache
export default function Page() {
  const [page, setPage] = useState(1);

  const increasePage = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const decreasePage = useCallback(() => {
    setPage(prevState => prevState - 1);
  }, []);

  const {data, isFetching} = useQuery({
    queryKey: [QUERY_KEY, page],
    queryFn: () => getApi(page),
    ...example,
  });

  const forceReRender = useForceReRender();

  useLogWhenRendering('re-render', data, isFetching);

  return (
    <>
      <Button onClick={forceReRender}>forceReRender</Button>
      <Button onClick={increasePage}>Next Page</Button>
      <Button onClick={decreasePage}>Previous Page</Button>
    </>
  );
}

const QUERY_KEY = 'react-query/cache-vs-stale';

async function getApi(page: number) {
  console.log('Api called', page);
  await timeoutPromise(example.TTFB);
  return `${page} 데이터`;
}
