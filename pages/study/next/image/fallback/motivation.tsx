import React from 'react';
import Image from 'next/image';
import {useDelay} from '@util/extend/time';

/**
 * Image src가 undefined이면 에러메시지로 추론이 가능하지만,
 * Image src가 null이면 에러메시지로 추론이 처음에는 힘들 수 있음.
 */

// URL: http://localhost:3000/study/next/image/fallback/motivation
export default function Page() {
  const enable = useDelay(10);

  if (!enable) {
    return null;
  }

  return (
    <>
      <Image src={undefined as any} alt="test" layout="fill"/>
      <Image src={null as any} alt="test" layout="fill"/>
    </>
  );
}
