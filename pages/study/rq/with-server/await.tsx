import React from 'react';
import {dehydrate, DehydratedStateProps, QueryClient, useQuery} from '@tanstack/react-query';
import {getMessageOfBothSide} from '@util/extend/next';
import {timeoutPromise, useLogWhenRendering} from '@util/extend/test';
import type {GetServerSideProps} from 'next';
import moment from 'moment';

/* Official https://tanstack.com/query/v4/docs/react/guides/ssr
 * TEST URL: http://localhost:3000/study/rq/with-server/await
 */
export default function Page() {
  const {data} = useQuery({queryKey: [QUERY_KEY], queryFn: getApi});

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

const QUERY_KEY = 'with-server/await';

type ParamType = {
  fruit: string;
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps, ParamType> = async () => {
  const queryClient = new QueryClient();

  /**
   * await 안붙이면
   * 그냥 미리 prefetch만 보내놓고 안기다린다음,
   * 처음에는 데이터없는 페이지로 노출되고
   * 이후에 데이터 받아오면 보여지게될거라고 예상했지만, 아니었음.
   */
  queryClient.prefetchQuery({
    queryKey: [QUERY_KEY],
    queryFn: getApi
  });

  /**
   * 미리 prefetch 보내놓고 (4초짜리 API)
   * 3.8초동안 ssr에서 기다린다음에 props 반환하면
   * 클라이언트에서는 0.2초만에 응답받을수있을거라 생각했음.
   * 하지만 아니었음.
   *
   * 근데, 서버와 클라이언트 관계에 대해 다시 생각해보니 이게 얼마나 말이안되는 생각인지 알게됨.
   * = await안붙일꺼면, server side에서 (ssg포함) prefetch 안쓰는게 맞음.
   */
  await timeoutPromise(3800);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
};
