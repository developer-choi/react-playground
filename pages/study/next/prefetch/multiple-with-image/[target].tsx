import React from "react";
import type {GetStaticPaths, GetStaticProps} from "next";
import {timeoutPromise} from "@util/extend/test";
import moment from "moment";

interface PageProp {
  time: string;
}

export default function Page({time}: PageProp) {
  return <div>time={time}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: []
  };
};

export const getStaticProps: GetStaticProps<PageProp> = async () => {
  await timeoutPromise(TTFB_TIMEOUT);

  return {
    props: {
      time: moment().format("HH:mm:ss")
    },
    revalidate: 1
  };
};

const TTFB_TIMEOUT = 3000;
