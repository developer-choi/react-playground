import React, {useEffect} from 'react';
import type {GetServerSideProps} from 'next';
import {timeoutPromise} from '@util/extend/test';
import styled from 'styled-components';
import Link from 'next/link';
import {useRouter} from 'next/router';

// URL: http://localhost:3000/solution/global/cursor-loading
export default function Page() {
  //원래는 _app.tsx에서 실행시키면 모든페이지 실행시킬 수 있음.
  useLoadingBetweenPageMoves()

  return (
    <Wrap>
      {hrefList.map(href => (
        <Link key={href} href={href}>
          {href}
        </Link>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  > a {
    display: block;
    margin: 10px;
    font-size: 18px;
  }
`;

const hrefList = [1, 2, 3, 4, 5].map(value => `/solution/global/cursor-loading?page=${value}`)

export const getServerSideProps: GetServerSideProps = async () => {
  await timeoutPromise(3000)
  return {
    props: {
    }
  };
};

function useLoadingBetweenPageMoves() {
  const {events} = useRouter();

  useEffect(() => {
    const routeChangeStart = () => {
      document.body.classList.add('cursor-loading');
    };

    const routeChangeSettled = () => {
      document.body.classList.remove('cursor-loading');
    };

    events.on('routeChangeStart', routeChangeStart);
    events.on('routeChangeError', routeChangeSettled);
    events.on('routeChangeComplete', routeChangeSettled);

    return () => {
      events.off('routeChangeStart', routeChangeStart);
      events.off('routeChangeError', routeChangeSettled);
      events.off('routeChangeComplete', routeChangeSettled);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
