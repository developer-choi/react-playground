'use client';

import {useQuery} from '@tanstack/react-query';
import {usePeriodTimer} from '@/utils/extend/timer';

// URL: http://localhost:3000/staging/timer/period/basic
// Doc: https://docs.google.com/document/d/1HJkytM33ADDc_vcZvV1AHfslX8NLdTigCGe8cSR-gE8/edit#heading=h.bxmojislumzh
export default function Page() {
  return (
    <>
      <DynamicPeriodExample/>
      <StaticPeriodExample/>
    </>
  );
}

function DynamicPeriodExample() {
  const {data, isLoading} = useQuery({
    queryKey: ['event-banner'],
    queryFn: getDynamicEventBanner
  });

  const dynamicResult = usePeriodTimer({
    period: data,
    onTerminated: () => {
      console.log('onTerminated in <DynamicPeriodExample/>');
    }
  });

  return (
    <div>
      {isLoading ? '로딩중' : (
        <span>{dynamicResult.isProceeding ? `진행중 - ${dynamicResult.proceedingText}` : '종료됨'} - Dynamic</span>
      )}
    </div>
  )
}

function StaticPeriodExample() {
  const staticResult = usePeriodTimer({
    period: STATIC_PERIOD,
    onTerminated: () => {
      console.log('onTerminated in <StaticPeriodExample/>');
    }
  });

  return (
    <div>
      <span>{staticResult.isProceeding ? `진행중 - ${staticResult.proceedingText}` : '종료됨'} - Static</span>
    </div>
  );
}


async function getDynamicEventBanner() {
  return STATIC_PERIOD;
}

const STATIC_PERIOD = {
  startTimestamp: Date.now() - 2000,
  endTimestamp: Date.now() + 5000
};
