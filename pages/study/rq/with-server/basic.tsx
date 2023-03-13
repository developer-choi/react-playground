import React from 'react';
import {dehydrate, DehydratedStateProps, QueryClient, useQuery} from '@tanstack/react-query';
import {getMessageOfBothSide} from '@util/extend/next';
import {timeoutPromise} from '@util/extend/test';
import type {GetServerSideProps} from 'next';

/* Official https://tanstack.com/query/v4/docs/react/guides/ssr
 * TEST URL: http://localhost:3000/study/rq/with-server/basic
 */
export default function Page() {
  const {data} = useQuery({queryKey: [QUERY_KEY], queryFn: getApi});

  return (
    <>
      {data}
    </>
  )
}

async function getApi() {
  console.log('call API', getMessageOfBothSide());
  await timeoutPromise(1000);

  return 'data';
}

const QUERY_KEY = 'with-server/basic';

type ParamType = {
  fruit: string;
};

export const getServerSideProps: GetServerSideProps<DehydratedStateProps, ParamType> = async () => {
  const queryClient = new QueryClient();

  // queryClient.prefetchQuery({
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY],
    queryFn: getApi
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
};
