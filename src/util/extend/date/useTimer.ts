import {useCallback, useEffect, useState} from "react";
import {useEffectFromTheSecondTime} from "@util/extend/react";

/**
 * 요구조건
 * 1. (필수) 종료일 지정하고 현재 기준 남아있는 시간을 다양한 형태(timestamp, 연월일시분초 등)으로 제공한다.
 * 2. 종료될 때 실행될 콜백을 지정한다. (처음부터 종료된경우에도 대응)
 */
export interface UseTimerParameter {
  expiredTimestamp: number
  terminatedCallback?: () => void
}

export function useTimer({expiredTimestamp, terminatedCallback}: UseTimerParameter) {
  const checkTerminated = useCallback((currentTimestamp: number) => {
    return (expiredTimestamp - currentTimestamp) < 1000
  }, [expiredTimestamp]);

  //현재 타임스탬프가 아닌, 최근 타임스탬프로 명명한 이유는 종료되고나면 종료됐을 그 당시 timstamp에서 멈추기때문
  const [recentTimestamp, setRecentTimestamp] = useState(new Date().getTime());

  useEffectFromTheSecondTime(useCallback(() => {
    console.log('reset');
    setRecentTimestamp(new Date().getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiredTimestamp]))

  //reset
  useEffect(() => {
    //이 로직이 실행될 시점의 recentTimestamp값이 필요하고, recentTimestamp값이 바뀔 때 이 이펙트가 실행될 필요가 없음.
    if (checkTerminated(recentTimestamp)) {
      terminatedCallback?.();
      return;
    }

    console.log('setInterval');
    const intervalId = setInterval(() => {
      setRecentTimestamp(prevState => {
        console.log('loop');
        const next = prevState + 1000

        if (checkTerminated(next)) {
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
  }, [checkTerminated, terminatedCallback]);

  const status = checkTerminated(recentTimestamp) ? "terminated" : "running";
  const diff = status === "terminated" ? 0 : expiredTimestamp - recentTimestamp;
  const date = status === "terminated" ? 0 : Math.floor(diff / DATE);
  const hour = status === "terminated" ? 0 : Math.floor((diff - date * DATE) / HOUR);
  const minute = status === "terminated" ? 0 : Math.floor((diff - date * DATE - hour * HOUR) / MINUTE);
  const second = status === "terminated" ? 0 : Math.floor((diff - date * DATE - hour * HOUR - minute * MINUTE) / SECOND);

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

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DATE = HOUR * 24
