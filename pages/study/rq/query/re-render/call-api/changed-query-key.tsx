import React from 'react';
import type {GetServerSideProps} from 'next';
import {timeoutPromise, useLogWhenRendering} from '@util/extend/test';
import moment from 'moment';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import useCounter from '@util/services/counter';
import Button from '@component/atom/element/Button';

type ExampleType = Pick<UseQueryOptions<any>, 'staleTime' | 'cacheTime'> & {
  refetchOnWindowFocus?: boolean;
};

/**Flow
 * 페이지 이동할 때마다 API가 호출됨.
 * (= 기존에 cacheTime는 fetch 시점에만 영향을 준다는건 잘못된말이 맞음.)
 * (= 그냥 단순히 트리거됐을 때 stale하면 API 다시 호출하는거임.)
 */
const example1: ExampleType = {
  cacheTime: Infinity,
  refetchOnWindowFocus: false
};

/** Flow
 * 페이지 이동할 때마다 API가 호출됨.
 *
 * 1. useQuery({queryKey: [items]})가 마운트 됐을 때
 * (1) 처음 이 컴포넌트가 마운트 될 때 (공식문서에서 page = 1로 useQuery의 queryKey가 "마운트"됐다고 표현함. react하고 용어겹침)
 * - https://tanstack.com/query/v4/docs/react/guides/caching에서 "A new instance of useQuery({ queryKey: ['todos'], queryFn: fetchTodos }) mounts." 라는 표현이 있음.
 * - 1페이지 쿼리키의 캐시데이터가 없어서 API 호출됨.
 *
 * (2) 1페이지에서 2페이지로 갔을 때
 * - 2페이지 기준의 queryKey는 새로 마운트된게 맞음. 그래서 2페이지 기준으로 캐시데이터없어서 또 API 호출함.
 * - (매우중요) 1페이지에서 2페이지로 갔으므로, 1페이지에 대한 쿼리키는 inactive상태가 됐음. (이 때부터 흘러가는 시간과 cacheTime과 비교해서 캐시삭제됨)
 *
 * (3) 2페이지에서 다시 1페이지로 갔을 때
 * - cacheTime이 0이기때문에, 1페이지에서 2페이지로 간 순간부터 0초가 지나서 캐시데이터는 바로 삭제되었을거고,
 * - 암튼 해당 쿼리키로 캐시데이터 없기때문에 또 API 호출함.
 *
 * (1) (2) (3) 모두 각각 1페이지, 2페이지, 1페이지의 쿼리키가 마운트되었다고 표현함. (공식문서)
 */
const example2: ExampleType = {
  staleTime: Infinity,
  cacheTime: 0,
  refetchOnWindowFocus: false
};

/** Flow
 * 1. 3초안에 2페이지로갔다가 다시 1페이지로 갔다가 2페이지갔다가 1페이지감.
 * (1) 최초 2페이지갈때 data는 undefined로 찍힘.
 * - 2페이지 데이터가 캐시에 없어서 undefined로 나오는것.
 *
 * (2) 2번째로 2페이지갈때는 data가 있음. API호출도 안됨.
 * - API호출 안되는 이유는, 3초만에 2페이지를 두번 방문했으니까 stale하지않은상태여서그럼.
 *
 * 2. (현재 1페이지임) 3초 지난 다음에 + 10초가 지나기전에 다시 2페이지로 감.
 * (1) API는 호출됨. > 3초가 지나서 stale한 상태이니까.
 * (2) 여전히 데이터는 보일거임. > 아직 10초가 안됐으니까 캐시데이터가 존재하므로.
 *
 * 3. (현재 2페이지임) 2페이지에 온 뒤에 10초가 지나고 나서 1페이지로 감.
 * (1) API는 호출됨.
 * - 3초 이상 지나서 1페이지 데이터가 stale한 상태이기도 하고... ??? ㄴㄴㄴ
 * - 1페이지를 떠난 뒤 10초 이상 지나서 캐시데이터가 아예 없어서 API 호출됐다고 말하는게 맞음.
 *
 * (2) 데이터는 또 undefined로 찍임.
 * - 1페이지를 떠난 뒤 10초이상 지나서 캐시데이터가 아예 없으니까 undefined로 뜨는것.
 */
const example3: ExampleType = {
  staleTime: 3000,
  cacheTime: 10000,
  refetchOnWindowFocus: false
};

const currentExample = example1;

// URL: http://localhost:3000/study/rq/query/re-render/call-api/changed-query-key
export default function Page() {
  const {count, increase, decrease} = useCounter({initial: 1});

  const {data} = useQuery({
    queryKey: ['changed-query-key', count],
    queryFn: () => getApi(count),
    ...currentExample
  });

  useLogWhenRendering(data);

  return (
    <>
      <div>현재 페이지: {count}</div>
      <Button onClick={increase}>Next page</Button>
      <Button onClick={decrease}>Previous page</Button>
    </>
  );
}

async function getApi(count: number) {
  console.log('call API');
  await timeoutPromise(500);
  return count + '-' + moment().format('HH:mm:ss');
}
