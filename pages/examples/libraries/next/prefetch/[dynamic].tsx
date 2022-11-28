import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

/**
 * 개발자 도구 열고
 * 네트워크 패널에 All탭을 고른다음 테스트하면됨.
 * (Development build에서는 prefetch가 안가고, Production build에서만 prefetch가 감.
 */
export default function Page() {
  return (
    <>
      {/* 이 링크에 hover하면 404뜸 */}
      <Link href="" passHref>
        <Anchor>prefetch 실패용도의 링크 (HOVER ME)</Anchor>
      </Link>

      {/* 아래 링크에 hover하면 304뜸 */}
      <Link href="/examples/libraries/next/prefetch/some1" passHref>
        <Anchor>prefetch 성공용도의 링크 (HOVER ME)</Anchor>
      </Link>

      <Link href="/examples/libraries/next/prefetch/some2" passHref>
        <Anchor>prefetch 성공용도의 링크 (HOVER ME)</Anchor>
      </Link>
    </>
  );
}

const Anchor = styled.a`
  display: block;
  padding: 5px;
`;

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [{params: {dynamic: 'some1'}}, {params: {dynamic: 'some2'}}]
  };
}

export async function getStaticProps() {
  return {
    props: {
      hello: 'world'
    }
  };
}
