'use client';

import {useDiffTimer, usePeriodTimer} from '@/utils/extend/timer';
import {useQuery} from '@tanstack/react-query';
import Button from '@/components/element/Button';

/**
 * URL: http://localhost:3000/solution/etc/timer
 * Doc: https://docs.google.com/document/d/1HJkytM33ADDc_vcZvV1AHfslX8NLdTigCGe8cSR-gE8/edit#heading=h.bxmojislumzh
 *
 * 요구조건 > 렌더링횟수가 합리적이어야함. 같은 state값으로 두번 따닥 리렌더링되고 그런일 없어야함.
 */
export default function Page() {
  return (
    <>
      <CertificationTimer/>
      <Dynamic/>
      <Static/>
    </>
  );
}

function CertificationTimer() {
  const timer = useDiffTimer({
    diffSeconds: 3,
    beforeStart: () => {
      // clearErrors('phone_number');
    },
    onTerminated: () => {
      // setError('phone_number', {
      //   type: 'timeout',
      //   message: '인증 시간이 초과되었습니다. 재전송 해주세요',
      // });
      console.log('종료!!');
    },
  });

  return (
    <div>
      <Button onClick={timer.start}>인증번호 전송</Button>
      <span>{timer.dateText}</span>
      <Button onClick={timer.initialize}>인증번호 확인</Button>
    </div>
  )
}

function Dynamic() {
  const {data, isLoading} = useQuery({
    queryKey: ['event-banner'],
    queryFn: getDynamicEventBanner
  });

  const dynamicResult = usePeriodTimer({
    period: data,
  });

  return (
    <div>
      {isLoading ? '로딩중' : (
        <span>{dynamicResult.isProceeding ? `진행중 - ${dynamicResult.dateText}` : '종료됨'} - Dynamic</span>
      )}
    </div>
  )
}

function Static() {
  const staticResult = usePeriodTimer({
    period: STATIC_PERIOD
  });

  return (
    <div>
      <span>{staticResult.isProceeding ? `진행중 - ${staticResult.dateText}` : '종료됨'} - Static</span>
    </div>
  );
}

async function getDynamicEventBanner() {
  return {
    startTimestamp: Date.now() - 1000,
    endTimestamp: Date.now() + 1000 * 10
  };
}

const STATIC_PERIOD = {
  startTimestamp: Date.now() - 1000,
  endTimestamp: Date.now() + 5000
};
