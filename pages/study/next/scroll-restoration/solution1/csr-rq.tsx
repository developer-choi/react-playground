import styled from 'styled-components';
import {flexCenter} from '@util/services/style/css';
import {range} from '@util/extend/data-type/number';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useScrollRestoration} from '@util/extend/next';
import {timeoutPromise} from '@util/extend/test';
import {useQuery} from '@tanstack/react-query';

/** Flow (Only Production)
 * 1. (O) URL 직접치고 들어가면 맨위로 스크롤
 * 2. (X) 스크롤 좀 내리고 새로고침하면 스크롤 복구됨. (약간의 높이 오차있음)
 * 3. (O) 스크롤 안내리고 링크 타고 들어갔다가 뒤로가기하면 스크롤 맨위로감
 * 4. (△) 스크롤 내리고 링크타고 들어갔다가 뒤로가기하면 스크롤 복구됨. (약간의 높이 오차있음)
 *
 * 기존 default/csr, solution1/csr 두개 기준 4번이 해결됨.
 */

// URL: http://localhost:3000/study/next/scroll-restoration/solution1/csr-rq
export default function Page() {
  useScrollRestoration();
  const {data = []} = useQuery({
    queryKey: ['solution1-csr'],
    queryFn: getApi
  });

  return (
    <Wrap>
      {data.map(value => (
        <Link key={value} href="/" passHref>
          <Row>{value}</Row>
        </Link>
      ))}
    </Wrap>
  );
}

export async function getApi() {
  await timeoutPromise(500);
  return range(1, 100);
}

const Wrap = styled.div`
  padding: 20px;
`;

const Row = styled.a`
  height: 200px;
  border: 5px solid red;
  ${flexCenter};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
