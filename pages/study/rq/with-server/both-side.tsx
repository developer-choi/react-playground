import React from "react";
import type {GetServerSideProps} from "next";
import {dehydrate, DehydratedPageProps, QueryClient, useQuery} from "@tanstack/react-query";

/**
 * server side에서 받아온 데이터를
 * client side에서 재사용하기위해 useQuery로 가져오려는데,
 * client side에서 getApi()를 또 호출하는 잘못된 예제를 남김.
 * 또 호출하는 이유는, useQuery에서 staleTime을 지정하지 않았기 때문.
 */

// URL: http://localhost:3000/study/rq/with-server/both-side
export default function Page() {
  const {data} = useQuery(queryOption);

  return <div>{data}</div>;
}

export const getServerSideProps: GetServerSideProps<DehydratedPageProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryOption);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const queryOption = {
  queryKey: ["both-side"],
  queryFn: getApi
  // staleTime: 1000
  // staleTime: 100
};

async function getApi() {
  console.log("Api called.");
  return new Date().getTime();
}
