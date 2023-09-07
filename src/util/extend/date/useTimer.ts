import {useCallback, useEffect, useState} from "react";
import {useEffectFromTheSecondTime} from "@util/extend/react";

/**
 * 요구조건
 * 1. (필수) 종료일 지정하고 현재 기준 남아있는 시간을 다양한 형태(timestamp, 연월일시분초 등)으로 제공한다.
 * 2. (선택) 시작일 지정하고, 시작일이 미래면 시작안한다.
 * 3. 종료될 때 실행될 콜백을 지정한다. (처음부터 종료된경우에도 대응)
 */
export interface UseTimerParameter {
  expiredTimestamp: number
  startTimestamp?: number
  terminatedCallback?: () => void
}

export function useTimer({expiredTimestamp, terminatedCallback, startTimestamp}: UseTimerParameter) {
  //현재 타임스탬프가 아닌, 최근 타임스탬프로 명명한 이유는 종료되고나면 종료됐을 그 당시 timstamp에서 멈추기때문
  const [recentTimestamp, setRecentTimestamp] = useState(new Date().getTime());

  useEffectFromTheSecondTime(useCallback(() => {
    console.log('reset');
    setRecentTimestamp(new Date().getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiredTimestamp, startTimestamp]))

  //reset
  useEffect(() => {
    const status = getTimerStatus({currentTimestamp: recentTimestamp, startTimestamp, expiredTimestamp})

    //이 로직이 실행될 시점의 recentTimestamp값이 필요하고, recentTimestamp값이 바뀔 때 이 이펙트가 실행될 필요가 없음.
    if (status === 'terminated') {
      terminatedCallback?.();
      return;
    }

    if (status === 'future') {
      return
    }

    console.log('setInterval');
    const intervalId = setInterval(() => {
      setRecentTimestamp(prevState => {
        console.log('loop');
        const next = prevState + 1000

        if (getTimerStatus({currentTimestamp: next, expiredTimestamp}) === 'terminated') {
          clearInterval(intervalId);
          terminatedCallback?.();
        }

        return next;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiredTimestamp, terminatedCallback]);

  const status = getTimerStatus({currentTimestamp: recentTimestamp, startTimestamp, expiredTimestamp})

  /** Limitation
   * 최대단위가 바뀌면 이 로직도 같이 바뀌어야하는게 맘에안듬.
   * 소스코드상 기준은 최대 단위가 "일"인데, 이게 hour로 바뀌면 여기로직을 직접 수정해야함.
   * 동적으로 "maxUnit"같은거 function의 parameter로 받아서 동적으로 처리하려다가 로직 못짜겠어서 포기했었음.
   */
  const diff = status !== "running" ? 0 : expiredTimestamp - recentTimestamp;
  const date = status !== "running" ? 0 : Math.floor(diff / DATE);
  const hour = status !== "running" ? 0 : Math.floor((diff - date * DATE) / HOUR);
  const minute = status !== "running" ? 0 : Math.floor((diff - date * DATE - hour * HOUR) / MINUTE);
  const second = status !== "running" ? 0 : Math.floor((diff - date * DATE - hour * HOUR - minute * MINUTE) / SECOND);

  return {
    recentTimestamp,
    status,
    diff: {
      date,
      hour,
      minute,
      second
    }
  }
}

interface TimerStatusParam {
  startTimestamp?: number;
  expiredTimestamp: number
  currentTimestamp: number
}

//future = 시작일이 미래여서 시작안함.
type TimerStatus = 'terminated' | 'running' | 'future'

function getTimerStatus({expiredTimestamp, startTimestamp, currentTimestamp}: TimerStatusParam): TimerStatus {
  if (startTimestamp && currentTimestamp < startTimestamp) {
    return 'future'
  }
  
  return (expiredTimestamp - currentTimestamp) < 1000 ? 'terminated' : 'running'
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DATE = HOUR * 24
