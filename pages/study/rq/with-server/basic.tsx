import React from "react";
import {dehydrate, DehydratedPageProps, QueryClient, useQuery} from "@tanstack/react-query";
import {getMessageOfBothSide} from "@util/extend/next";
import {timeoutPromise} from "@util/extend/test";
import type {GetServerSideProps} from "next";

/* Official https://tanstack.com/query/v4/docs/react/guides/ssr
 * TEST URL: http://localhost:3000/study/rq/with-server/basic
 */
export default function Page() {
  const {data} = useQuery({queryKey: [QUERY_KEY], queryFn: getApi});

  /** 실행결과
   * TTFB 1초뒤에
   * 최초 페이지 렌더링 시점부터 데이터가 존재하게됨. (= SSR처럼)
   */

  return <>{data}</>;
}

async function getApi() {
  console.log("call API", getMessageOfBothSide());
  await timeoutPromise(1000);

  return "data";
}

const QUERY_KEY = "with-server/basic";

type ParamType = {
  fruit: string;
};

export const getServerSideProps: GetServerSideProps<DehydratedPageProps, ParamType> = async () => {
  const queryClient = new QueryClient();

  // await을 반드시 해야함. 안하면 안됨.
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY],
    queryFn: getApi
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
