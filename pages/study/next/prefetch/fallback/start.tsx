import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import Button from '@component/atom/element/Button';

// URL: http://localhost:3000/study/next/prefetch/fallback/start

/**
 * yarn build:dev로 production 환경에서
 *
 * Case 1. start page에서 http://localhost:3000/study/next/prefetch/fallback/n으로 가는 "링크를 눌렀을 때"
 * (1) fallback true, blocking ==> 모두 동일하게 동작함. n초 뒤에 페이지로 이동됨. (마치 blocking처럼)
 * (2) fallback false ==> n초뒤에 즉시 404페이지로 이동됨.
 *
 * Case2. http://localhost:3000/study/next/prefetch/fallback/2로 접속할 때
 * (1) false: getStaticPaths() ==> 404에러 순서로 실행됨. (이 예제에서는 즉시 404페이지로 보임)
 * (2) true: getStaticPaths() ==> fallback rendering ==> getStaticProps() 순서로 실행됨. (이 예제에서는 n초동안 로딩 보이고나서 리다이랙트됨)
 * (3) blocking: getStaticPaths() ==> getStaticProps() ==> rendering 순서로 실행됨. (이 예제에서는 n초동안 렌더링이 안되다가 getStaticProps()가 종료되면 그 때 렌더링됨)
 *
 * # 알 수 있는 사실
 * 1. 링크를 눌러서 갔을 때 진짜로 fallback true인 페이지도 fallback blocking페이지 처럼 작동함.
 */
export default function Page() {
  const [page, setPage] = useState(1);

  const increase = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const decrease = useCallback(() => {
    setPage(prevState => prevState - 1)
  }, []);

  return (
    <>
      <Link href={`/study/next/prefetch/fallback/${page}`}>
        <a>
          fallback/{page} 페이지 가는 링크
        </a>
      </Link>
      <Button onClick={increase}>Increase</Button>
      <Button onClick={decrease}>Decrease</Button>
    </>
  );
}
