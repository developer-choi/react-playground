import React from "react";
import type {GetStaticPaths, GetStaticProps} from "next";
import {timeoutPromise, useLogWhenRendering} from "@util/extend/test";
import {destructDate} from "@util/extend/date/date-convert";
import {useRouter} from "next/router";

interface PageProp {
  time: string;
}

export default function Page({time}: PageProp) {
  const {isFallback} = useRouter();
  useLogWhenRendering("props", time, isFallback);
  return <div>time={time}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: []
  };
};

export const getStaticProps: GetStaticProps<PageProp> = async () => {
  const {hour, minute, second} = destructDate();
  const time = `${hour}:${minute}:${second}`;
  console.log("start", time);
  await timeoutPromise(TTFB_TIMEOUT);
  console.log("end");

  return {
    props: {
      time
    },
    revalidate: 1
  };
};

const TTFB_TIMEOUT = 3000;
