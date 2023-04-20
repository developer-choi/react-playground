import React from 'react';
import type {GetServerSideProps} from 'next';
import {dehydrate, DehydratedPageProps, QueryClient} from '@tanstack/react-query';
import {ATNY_MAIN_QUUERY_OPTION, useAtnyMainFullQuery} from '@util/services/atny-main';
import styled from 'styled-components';

/** Flow (Only production) 수치는 모두 노트북기준.
 *
 * 1. express-playground 프로젝트 실행시키고
 * 2. yarn build:dev 스크립트로 빌드된 상태에서
 * 3. 개발자도구열고 네트워크패널 Doc 고른다음에 html파일 Timing 탭 보면
 * 4. 227kB 사이즈에 TTFB 3120ms + Content Download 77ms 걸렸음.
 *
 * 1. SSR단계에서 호출하는 API는 http://localhost:8000/course/list?page=1&articlePerPage=10000 이고
 * 2. TTFB 76ms가 걸림.
 * 3. 즉, HTML TTFB 1320ms중에 API때문에 생긴 76ms를 제외하면 거의 1250ms가 html파일만드는데에만 사용됐다는걸 알 수 있음.
 *
 * [two-step-main.tsx]
 * 즉 HTML다 받는데에만 TTFB가 1.3초나 걸려서, 이 문제를 해결하기위해
 * API를 반반씩 쪼개서 호출하기로 했음.
 * 1부터 10까지를 받아야한다면,
 * 뷰포트에 보이는 데이터가 1부터 5까지라서 1부터 5까지만 SSR단계에서 가져오고
 * 6부터 10까지를 CSR단계에서 가져오는것으로 변경했음.
 * >> 그 결과 HTMl TTFB 시간이 1.3초에서 0.7초로 거의 절반가량 줄었음.
 */

// URL: http://localhost:3000/solution/rq/optimization/full-main
export default function Page() {
  const list = useAtnyMainFullQuery();

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

  await queryClient.prefetchQuery(ATNY_MAIN_QUUERY_OPTION.full);

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
