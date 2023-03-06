import React from 'react';
import styled from 'styled-components';
import {timeoutPromise, useLogWhenRendering} from '@util/extend/test';
import {useRouter} from 'next/router';

export default function Page() {
  const {isFallback} = useRouter();

  useLogWhenRendering('rendering')

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
  await timeoutPromise(TTFB_TIMEOUT);
  console.log('getStaticProps end');

  return {
    props: {
    }
  };
}

const TTFB_TIMEOUT = 3000;

const Wrap = styled.div`
  height: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  font-weight: bold;
  color: red;
`;
