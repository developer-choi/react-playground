import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// URL: http://localhost:3000/study/next/prefetch/not-found/start
export default function Page() {
  return (
    <Wrap>
      <Link href="/study/next/prefetch/not-found/1">정상이동되는 페이지</Link>
      <Link href="/study/next/prefetch/not-found/2">매번 2초뒤에 404보이는 페이지</Link>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    padding: 10px;
    text-decoration: underline;
  }
`;