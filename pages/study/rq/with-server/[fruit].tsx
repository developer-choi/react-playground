import React from 'react';
import type {GetServerSideProps} from 'next';
import {dehydrate, DehydratedPageProps, useQuery} from '@tanstack/react-query';
import {timeoutPromise} from '@util/extend/test';
import {getMessageOfBothSide} from '@util/extend/next';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import {QUERY_CLIENT_INSTANCE} from '@pages/_app';

/* Official https://tanstack.com/query/v4/docs/react/guides/ssr
 * TEST URL: http://localhost:3000/study/rq/with-server/apple
 */
export default function Page() {
  const fruit = useRouter().query.fruit as string;
  const {data} = useQuery({queryKey: [QUERY_KEY, fruit], queryFn: () => getApi(fruit)});

  /**
   * apple페이지에서
   * banana 페이지 갔다가
   * 다시 apple 페이지 가면
   * TTFB 거의없음. (= cache가 의도대로 작동함)
   */

  return (
    <>
      {data}
      <Wrap>
        {links.map(link => (
          <Link key={link} href={`/study/rq/with-server/${link}`}>
            {link}
          </Link>
        ))}
      </Wrap>
    </>
  )
}

const links: string[] = [
  'apple',
  'banana',
  'kiwi'
];

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  
  a {
    padding: 10px;
    font-size: 20px;
  }
`;

async function getApi(fruit: string = "") {
  console.log('call API', getMessageOfBothSide());
  await timeoutPromise(1000);

  return `data: ${fruit}`;
}

const QUERY_KEY = 'with-server/fruit';

type ParamType = {
  fruit: string;
};

export const getServerSideProps: GetServerSideProps<DehydratedPageProps, ParamType> = async ({params}) => {
  const fruit = params?.fruit;

  const cache = QUERY_CLIENT_INSTANCE.getQueryData([QUERY_KEY, fruit]);
  console.log('cache', cache);

  await QUERY_CLIENT_INSTANCE.prefetchQuery({
    queryKey: [QUERY_KEY, fruit],
    queryFn: () => getApi(fruit),
    staleTime: Infinity
  });

  return {
    props: {
      dehydratedState: dehydrate(QUERY_CLIENT_INSTANCE),
    },
  }
};
