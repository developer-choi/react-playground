import Button from '@component/atom/element/Button';
import {useLogWhenRendering} from '@util/extend/test';
import {useCallback, useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useForceReRender} from '@util/extend/react';

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
   *
   * 주목해야할 부분은,
   * 1. 1초안에 다시 탭전환해도 refetch가 발생하지않음. (= cacheTime은 refetch에 영향을 주지않는것으로 판단, staleTime만 이것에 영향을 줌)
   * 2. 2초이상 지속적으로 force-reRender 버튼을 눌러도, refetch 및 fetch 둘 다 발생하지않음. (= staleTime, cacheTime 둘 다 re-rendering 시점에 체크되지않음.)
   * 2(1) staleTime은 refetch 시점에 체크되고,
   * 2(2) cacheTime는 fetch 시점 (mount or queryKey is changed)에 체크되는것으로 판단.
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

  const forceReRender = useForceReRender();

  useLogWhenRendering('re-render', data);

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
  return `${page} 데이터`;
}
