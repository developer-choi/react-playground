import React from 'react';
import styled from 'styled-components';
import {timeoutPromise} from '@util/extend/promise';
import {useRouter} from 'next/router';

export default function Page() {
  console.log('rendering');
  const {isFallback} = useRouter();

  if (isFallback) {
    return (
      <Wrap>
        페 이 지 로 딩 중 (getStaticProps() 끝날 때까지)
      </Wrap>
    );
  }

  return (
    <div>새로운 정적 페이지 생성완료</div>
  );
};

/**
 * In development, Case 1. http://localhost:3000/libraries/next/fallback/1로 접속할 때
 * ==> fallback true, false, blocking 모두 동일하게 동작함. 1.5초 뒤에 /페이지로 이동됨.
 *
 * In development, Case2. http://localhost:3000/libraries/next/fallback/2로 접속할 때
 * (1) false: getStaticPaths() ==> 404에러 순서로 실행됨. (이 예제에서는 즉시 404페이지로 보임)
 * (2) true: getStaticPaths() ==> rendering ==> getStaticProps() 순서로 실행됨. (이 예제에서는 1.5초동안 로딩 보이고나서 리다이랙트됨)
 * (3) 'blocking': getStaticPaths() ==> getStaticProps() ==> rendering 순서로 실행됨. (이 예제에서는 1.5초동안 렌더링이 안되다가 getStaticProps()가 종료되면 그 때 렌더링됨)
 *
 * In production, 맨처음 getStaticPaths()부분만 빠지고 나머지 동일함.
 */
export async function getStaticPaths() {
  console.log('getStaticPaths() call');
  return {
    paths: [{params: {id: '1'}}],

    // fallback: false,
    fallback: true,
    // fallback: 'blocking'
  };
}

export async function getStaticProps() {
  console.log('getStaticProps start');
  await timeoutPromise(1500);
  console.log('getStaticProps end');

  return {
    props: {
    }
  };
}

const Wrap = styled.div`
  height: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  font-weight: bold;
  color: red;
`;
