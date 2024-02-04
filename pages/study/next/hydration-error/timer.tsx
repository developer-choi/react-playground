import React from 'react';
import {getDiffDate} from '@util/extend/date/date-util';

/**
 * Hydration Error가 발생하는 예제임.
 * 서버 빌드 시점과, 브라우저에서 실행되는 시점과 timestsamp는 각각 다르기때문.
 */

// URL: http://localhost:3000/study/next/hydration-error/timer
export default function Page() {
  const tomorrow = getDiffDate(new Date(), [0, 0, 1]).getTime();

  return (
    <SampleTimer expiredTimestamp={tomorrow}/>
  );
}

interface SampleTimerProp {
  expiredTimestamp: number;
}

function SampleTimer({expiredTimestamp}: SampleTimerProp) {
  //1초씩마다 까려고함.
  return (
    <span>{expiredTimestamp}</span>
  );
}
