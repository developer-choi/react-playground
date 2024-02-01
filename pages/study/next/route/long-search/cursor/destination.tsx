import React from "react";
import type {GetServerSideProps} from "next";
import {timeoutPromise} from "@util/extend/test";
import {useBodyLoading} from "@pages/study/next/route/long-search/cursor/start";

export default function Page() {
  useBodyLoading();

  return <div>도착 페이지</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("ssr start");
  await timeoutPromise(5000);

  return {
    props: {}
  };
};
