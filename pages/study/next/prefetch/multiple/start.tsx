import React from 'react';
import {range} from '@util/extend/data-type/number';
import Link from 'next/link';
import styled from 'styled-components';

// URL: http://localhost:3000/study/next/prefetch/multiple/start

/**
 * 1. yarn build:dev
 * 2. 빌드 이후 최초 prefetch했을 때 200응답 및 3초뒤에 json 생성 (n개페이지씩)
 * 3. 이후 강력새로고침 여러번 해도, revalidate 되는동안에는 이전에 빌드된 페이지 응답 (이 때는 re-build 하는동안 blocking되지않음)
 *
 * # 알 수 있는부분
 * 1. prefetch를 한번에 엄청나게 많이하면, 나중에한 prefetch가 뒤늦게 응답된다. (체감상 한 6개씩 prefetch 받는듯)
 * (1) fallback는, 빌드 이후 사전에 빌드된 페이지 데이터가 없을 때 blocking된다는 뜻이고,
 * (2) 한번이라도 최초빌드 또는 re-build된 페이지 파일이 있다면 fallback은 발생하지않는다. (이전에 빌드된 페이지 그대로 응답하되 최신화만 해둠)
 *
 * 2. prefetch 하더라도 revalidate에 해당되더라도 다시 re-build하지 않는다. (해당 페이지로 이동 해야 revalidate 체크해서 re-build 된다)
 */
export default function Page() {
  return (
    <Wrap>
      {targets.map(target => (
        <Link key={target} href={target}>
          <a>{target}</a>
        </Link>
      ))}
    </Wrap>
  );
}

const targets = range(1, 100).map(value => `/study/next/prefetch/multiple/${value}`);

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
