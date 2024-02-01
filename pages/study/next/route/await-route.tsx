import React, {useCallback} from "react";
import type {GetServerSideProps} from "next";
import {timeoutPromise} from "@util/extend/test";
import {useRouter} from "next/router";
import Button from "@component/atom/element/Button";
import styled from "styled-components";

/**
 * push, replace에 await붙이면
 * 라우터이동이 끝나고 나서 로직을 순서에 맞게 실행시킬 수 있게된다.
 */
export default function Page() {
  const {query, push} = useRouter();

  const count = !query.count ? 0 : Number(query.count);

  const increase = useCallback(async () => {
    await push(
      {
        query: {
          count: count + 1
        }
      },
      undefined,
      {
        scroll: false
      }
    );

    window.scroll({
      top: 2000,
      behavior: "smooth"
    });
  }, [count, push]);

  return (
    <>
      <div>
        <Button onClick={increase}>Click Me</Button>
      </div>
      <div>{count}</div>
      <Box />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await timeoutPromise(2000);

  return {
    props: {}
  };
};

const Box = styled.div`
  height: 2000px;
`;
