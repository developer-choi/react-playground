import {Button} from '@component/atom/button/button-presets';
import {timeoutPromise} from '@util/extend/promise';
import {useCallback, useState} from 'react';
import {useQuery} from '@tanstack/react-query';

export default function Page() {
  const [page, setPage] = useState(1);

  const increasePage = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const decreasePage = useCallback(() => {
    setPage(prevState => prevState - 1);
  }, []);

  // const {data} = useQuery([QUERY_KEY, page], () => {
  //   return getApi(page);
  // }, {
  //   cacheTime: 0
  // });

  // const {data} = useQuery([QUERY_KEY, page], () => {
  //   return getApi(page);
  // });

  const {data} = useQuery([QUERY_KEY, page], () => {
    return getApi(page);
  }, {
    staleTime: Number.MAX_SAFE_INTEGER,
    // cacheTime: 0 이거 주석풀면 아무것도 모르는 멍청한 사람이 되버림.
  });

  console.log('re-render', data);

  return (
    <>
      <Button onClick={increasePage}>Next Page</Button>
      <Button onClick={decreasePage}>Previous Page</Button>
    </>
  );
}

const QUERY_KEY = 'react-query/cache-vs-stale';

async function getApi(page: number) {
  console.log('api call...');
  await timeoutPromise(1000);
  return `${page} 데이터`;
}
