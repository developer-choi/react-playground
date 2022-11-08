import React, {useCallback, useState} from 'react';
import {Button} from '@component/atom/button/button-presets';
import {useQuery} from '@tanstack/react-query';
import {timeoutPromise} from '@util/extend/promise';

export default function Page() {
  const [page, setPage] = useState(1);
  const {isLoading, isFetching, isInitialLoading} = useQuery(['is-initial-loading', page], () => {
    return getApi(page);
  });

  const increase = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  /**
   * Trigger 버튼을 누르면 true true true ==> false false false로 계속 찍히고,
   * 다른탭 갔다가 오는 refetch를 이용하면, false true false ==> false false false로 계속 찍힘.
   * ?? 내가 이해했던 그 isInitialLoading이 아님. 컴포넌트 마운트 된 이래로 최초로 loading됬을 때 가 아니었음...
   */
  console.log('re-render', isLoading, isFetching, isInitialLoading);

  return (
    <Button onClick={increase}>Trigger</Button>
  );
}

async function getApi(page: number) {
  console.log('api call...');
  await timeoutPromise(2000);
  return `${page} 데이터`;
}
