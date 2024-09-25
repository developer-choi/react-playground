'use client';

import {usePeriodTimer} from '@/utils/extend/timer';
import dayjs from 'dayjs';

// URL: http://localhost:3000/staging/timer/period/exceed
// Doc: https://docs.google.com/document/d/1HJkytM33ADDc_vcZvV1AHfslX8NLdTigCGe8cSR-gE8/edit#heading=h.bxmojislumzh
export default function Page() {
  return (
    <>
      <Past/>
      <Future/>
    </>
  );
}

function Past() {
  const pastResult = usePeriodTimer({
    period: PAST_PERIOD,
    onTerminated: () => {
      console.log('onTerminated in <Past/>');
    }
  });

  return (
    <div>
      <span>{pastResult.isProceeding ? `진행중 - ${pastResult.proceedingText}` : '종료됨'}</span>
    </div>
  );
}

function Future() {
  const futureResult = usePeriodTimer({
    period: FUTURE_PERIOD,
    futureFormat: function (_, futureTimestamp) {
      return dayjs(futureTimestamp).format('YYYY-MM-DD HH:mm:ss') + ' 시작'
    },
    onTerminated: () => {
      console.log('onTerminated in <Future/>');
    }
  });

  let content = '';

  if (futureResult.isFuture) {
    content = futureResult.futureText;

  } else if (futureResult.isProceeding) {
    content = futureResult.proceedingText;

  } else if (futureResult.isTerminated) {
    content = '종료됨 - Static';
  }

  return (
    <div>
      <span suppressHydrationWarning>{content}</span>
    </div>
  );
}

// 이미 과거에 끝난거
const PAST_PERIOD = {
  startTimestamp: Date.now() - 10000,
  endTimestamp: Date.now() - 5000
};

// 시작 안한거, 미래에 시작될거
const FUTURE_PERIOD = {
  startTimestamp: Date.now() + 5000,
  endTimestamp: Date.now() + 10000
};
