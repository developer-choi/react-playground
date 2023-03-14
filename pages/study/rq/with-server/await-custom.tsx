import React from 'react';
import {dehydrate, DehydratedStateProps, useQuery} from '@tanstack/react-query';
import {getMessageOfBothSide} from '@util/extend/next';
import {timeoutPromise, useLogWhenRendering} from '@util/extend/test';
import type {GetServerSideProps} from 'next';
import moment from 'moment';
import {QUERY_CLIENT_INSTANCE} from '@pages/_app';

/* Official https://tanstack.com/query/v4/docs/react/guides/ssr
 * TEST URL: http://localhost:3000/study/rq/with-server/await-custom
 */
export default function Page() {
  const {data} = useQuery({queryKey: [QUERY_KEY], queryFn: getApi, refetchOnWindowFocus: false});

  /** 실생결과
   * TTFB 3.8초뒤에 데이터 없는상태로 페이지 보여짐
   * 이후 API 호출됨
   * 이후 4초뒤에 데이터가 채워짐 (0.2초가 아니라 4초임)
   */
  useLogWhenRendering('data', data, moment().format('HH:mm:ss'));

  return (
    <>
      {data}
    </>
  )
}

async function getApi() {
  console.log('call API', getMessageOfBothSide());
  await timeoutPromise(4000);

  return 'data';
}

const QUERY_KEY = 'with-server/await-custom';

type ParamType = {
  fruit: string;
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps, ParamType> = async () => {
  /**
   * query client instance를 동일하게 재사용해도,
   * 처음에 의도했던대로 작동하지는 않았음. (의도는 await.tsx페이지에 이 라인에 주석으로 작성함)
   */
  QUERY_CLIENT_INSTANCE.prefetchQuery({
    queryKey: [QUERY_KEY],
    queryFn: getApi
  });

  await timeoutPromise(3800);

  return {
    props: {
      dehydratedState: dehydrate(QUERY_CLIENT_INSTANCE),
    },
  }
};
