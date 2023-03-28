import React from 'react';
import type {GetServerSideProps} from 'next';
import {shuffleArray} from '@util/extend/random';
import type {DehydratedPageProps} from '@tanstack/react-query';
import {dehydrate, QueryClient, useQuery} from '@tanstack/react-query';

// URL: http://localhost:3000/study/next/hydration-error/resolve
export default function Page() {
  const {data} = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getNameListApi,
    refetchOnWindowFocus: false
  });

  if (!data) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      {data.list.map(name => (
        <div key={name}>
          {name}
        </div>
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<DehydratedPageProps> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY,
    queryFn: getNameListApi
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const QUERY_KEY = ['hydration-error/random'];

async function getNameListApi() {
  //여기서 해야함.
  return {
    list: shuffleArray(NAME_LIST)
  };
}

const NAME_LIST = [
  'John',
  'Jessica',
  'Adam',
  'Aria'
];
