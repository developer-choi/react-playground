'use client';

import {useDiffTimer} from '@/utils/extend/timer';
import {Button} from '@forworkchoe/core';

/**
 * URL: http://localhost:3000/staging/timer/diff
 * Doc: https://docs.google.com/document/d/1HJkytM33ADDc_vcZvV1AHfslX8NLdTigCGe8cSR-gE8/edit#heading=h.bxmojislumzh
 *
 * 요구조건 > 렌더링횟수가 합리적이어야함. 같은 state값으로 두번 따닥 리렌더링되고 그런일 없어야함.
 */
export default function Page() {
  return (
    <CertificationTimer/>
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
      <div>{timer.status}</div>
      <Button onClick={timer.start}>인증번호 전송</Button>
      <span>{timer.dateText}</span>
      <Button onClick={timer.initialize}>인증번호 확인</Button>
    </div>
  )
}
