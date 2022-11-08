import { Button } from '@component/atom/button/button-presets';
import {timeoutPromise} from '@util/extend/promise';
import {useCallback, useState} from 'react';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';
import {useQuery} from '@tanstack/react-query';

export default function Page() {
  const [page, setPage] = useState(1);

  // 페이지를 증가시켜도,
  const increasePage = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  /**
   * 강제로 리렌더링 시켜도, api call은 발생하지않는것을 확인.
   * 페이지 안바꾼 상태에서 탭이동해서 refetch를 오지게 해도 api call은 하지만
   * 렌더링될때마다 data는 계속 undefined가 아니었음. (원래는 fetching중에 계속 undefined 보여줬었는데...?)
   *
   * 즉, Flow는 아래와같은듯
   * 1. 최초 로딩시에 data = undefined
   * 2. (5분안에) 탭 바꿨을 때 refetch가 일어나는동안 re-render는 되더라도 data는 여전히 '1 페이지'로 나옴.
   * - 데이터 새로 받아오는동안 cache를 보여주고, 받아오면 화면 바꿔주려고
   * - 그래서 refetch했는데 받아온 데이터값이 같으면, 리렌더링이 안되고, 다르면 리렌더링됨, 블로그말은 진짜였음.
   * - 아 그대신.. 리패치된 데이터를 deepEqual로 일일히 비교해서 Reference Type이어도 데이터같으면 리렌더링안했음.
   *
   * 3. 2페이지로 올릴경우 2페이지 데이터는 없어서 fetching 중에는 data = undefined로 나옴. (keepPrevData 기본값 false임)
   */
  const forceReRender = useForceReRender();

  const {data} = useQuery([QUERY_KEY, page], () => {
    return getApi(page);
  });

  // 이거 주석풀어도 api call이 엄청 나가지는 않지만 refetch 후 데이터 같아도 리렌더링되는 버그가 생김.
  // useQuery([QUERY_KEY, page], () => getApi(page));
  // useQuery([QUERY_KEY, page], () => getApi(page));
  // useQuery([QUERY_KEY, page], () => getApi(page));
  // useQuery([QUERY_KEY, page], () => getApi(page));
  // useQuery([QUERY_KEY, page], () => getApi(page));
  // useQuery([QUERY_KEY, page], () => getApi(page));

  console.log('re-render', data);

  return (
    <>
      <Button onClick={increasePage}>Next Page</Button>
      <Button onClick={forceReRender}>Force re-render</Button>
    </>
  );
}

const QUERY_KEY = 'react-query/re-render';

async function getApi(page: number) {
  console.log('api call...');
  await timeoutPromise(1000);
  return {
    data: [`${page} 데이터`]
  };
}
