import React from "react";
import type {GetServerSideProps} from "next";
import {ATNY_MAIN_QUUERY_OPTION, useAtnyMainTwoStepQuery} from "@util/services/atny-main";
import {dehydrate, DehydratedPageProps, QueryClient} from "@tanstack/react-query";
import styled from "styled-components";

/** Flow (Only production) 수치는 모두 노트북기준.
 *
 * 1. express-playground 프로젝트 실행시키고
 * 2. yarn build:dev 스크립트로 빌드된 상태에서
 * 3. 개발자도구열고 네트워크패널 Doc 고른다음에 html파일 Timing 탭 보면
 * 4. 116kB 사이즈에 TTFB 725ms + Content Download 32ms 걸렸음.
 *
 * 1. SSR단계에서 호출하는 API는 http://localhost:8000/course/list?page=1&articlePerPage=5000 이고
 * 2. TTFB 42ms가 걸림.
 * 3. 즉, HTML TTFB 725ms중에 API때문에 생긴 42ms를 제외하면 거의 680ms가 html파일만드는데에만 사용됐다는걸 알 수 있음.
 */

// URL: http://localhost:3000/solution/rq/optimization/two-step-main
export default function Page() {
  const list = useAtnyMainTwoStepQuery();

  return (
    <Wrap>
      {list.map(({pk, title, topic, room, like, teacher, startTimestamp}) => (
        <span key={pk}>
          <span>{title}</span>
          <span>{topic.name}</span>
          <span>{room.name}</span>
          <span>{like}</span>
          <span>{teacher.name}</span>
          <span>{startTimestamp}</span>
        </span>
      ))}
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps<DehydratedPageProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(ATNY_MAIN_QUUERY_OPTION.first);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const Wrap = styled.div`
  font-size: 8px;
  color: lightgray;
`;
