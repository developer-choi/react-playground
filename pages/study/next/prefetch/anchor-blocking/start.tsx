import React, {useCallback} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import moment from 'moment';
import useCounter from '@util/services/counter';
import Button from '@component/atom/element/Button';

// URL: http://localhost:3000/study/next/prefetch/anchor-blocking/start

/**
 * Development는 prefetching되는동안, await prefetch(href) 부분에서 멈추지않고 즉시 Promise가 이행됨.
 * Production는 prefetching되는동안 await prefetch(href) 부분에서 멈춤.
 *
 * # In Production
 * 1. start 페이지에서, prefetching이 시작됨. (0번 페이지)
 * 2. 0페이지로 가는 버튼 누르면 prefetching 중에는 await에서 멈춤
 * 3. 0페이지로 이동됨
 * 4. 이후에 다시 start페이지로 가서 0페이지로 가는 버튼 누르면 즉시 0페이지로 이동됨. (이미 빌드 완료되서)
 *
 * (물론 fallback true이지만 링크타고가면 blocking처럼 동작됨)
 */
export default function Page() {
  const {prefetch} = useRouter();
  const {count, decrease, increase} = useCounter();
  const href = `/study/next/prefetch/anchor-blocking/${count}`;

  const onClick = useCallback(async () => {
    console.log('start', moment().format("HH:mm:ss"));
    await prefetch(href)
    console.log('end', moment().format("HH:mm:ss"));
  }, [href, prefetch]);
  
  return (
    <>
      <Link href={href}>
        <a onClick={onClick}>Click Me ({count})</a>
      </Link>
      <Button onClick={increase}>Increase</Button>
      <Button onClick={decrease}>Decrease</Button>
    </>
  );
}
