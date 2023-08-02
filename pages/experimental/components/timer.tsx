import React, {useCallback, useState} from "react";
import {useToggle} from "@util/extend/react";
import Button from "@component/atom/element/Button";
import {getDiffDate} from "@util/extend/date/date-util";
import {useTimer} from "@util/extend/date/useTimer";

// http://localhost:3000/experimental/components/timer

/** 테스트케이스
 * 1. 종료날짜가 미래인경우
 * (1) 시간초 까여야함.
 * (2) 다까이면 종료콜백함수 호출되야함. (즉시)
 *
 * 2. 종료날짜가 과거인경우
 * 바로 종료콜백함수 호출되야함. (즉시)
 *
 * 3. 중간에 종료날짜 바뀌면 리셋되야함
 * 4. 종료콜백이 바뀌는경우에도 반영되야함. (타이머 변경없이 콜백만 변경되야함)
 *
 * 5. 시작날짜가 미래인 경우, 시작을 안해야함.
 */

const TEST_CASE1 = {
  initial: getDiffDate(new Date(), [0, 0, 0, 0, 0, 5]).getTime(),
  change: () => getDiffDate(new Date(), [0, 0, 0, 0, 0, 5]).getTime()
}

const TEST_CASE2 = {
  initial: getDiffDate(new Date(), [0, 0, 0, 0, 0, 5]).getTime(),
  change: () => getDiffDate(new Date(), [0, 0, 0, 0, 0, -5]).getTime()
}

const TEST_CASE3 = {
  initial: getDiffDate(new Date(), [0, 0, 0, 0, 0, -5]).getTime(),
  change: () => getDiffDate(new Date(), [0, 0, 0, 0, 0, 5]).getTime()
}

const START_TIMESTAMP = undefined
// const START_TIMESTAMP = getDiffDate(new Date(), [0, 0, 0, 0, 0, -5]).getTime()
// const START_TIMESTAMP = getDiffDate(new Date(), [0, 0, 0, 0, 0, 2]).getTime()

const TEST_CASE = TEST_CASE1

export default function Page() {
  const terminatedCallback1 = useCallback(() => {
    console.log("terminated1");
  }, []);

  const terminatedCallback2 = useCallback(() => {
    console.log("terminated2");
  }, []);

  const {value, toggle} = useToggle()

  const [expiredTimestamp, setExpiredTimestamp] = useState(TEST_CASE.initial);

  const {diff: {date, hour, minute, second}, status} = useTimer({
    expiredTimestamp,
    startTimestamp: START_TIMESTAMP,
    terminatedCallback: value ? terminatedCallback1 : terminatedCallback2
  });

  const changeExpiredTimestamp = useCallback(() => {
    setExpiredTimestamp(TEST_CASE.change())
  }, []);

  return (
    <div suppressHydrationWarning>
      {status} {date}일 {hour}시 {minute}분 {second}초
      <Button onClick={changeExpiredTimestamp}>종료날짜 바꾸기</Button>
      <Button onClick={toggle}>종료콜백함수 바꾸기</Button>
    </div>
  );
}
