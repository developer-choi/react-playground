import {useCallback, useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import {usePrevious} from '@/utils/extend/library/react';
import {runCallbackInFuture} from '@forworkchoe/core/utils';

export interface DiffTimerOption {
  beforeStart?: () => void;
  format?: typeof defaultDiffTimerFormat;
  diffSeconds: number;
  onTerminated?: ExpiredTimerParam['onTerminated'];
}

/**
 * @description 현재시간기준 + n초만큼 타이머를 설정하는 경우에 씀.
 * @example 회원가입에서 휴대폰번호 인증할 때 3분짜리 타이머 설정하고싶으면, diffSeconds 180 전달하면됨.
 *
 * 구체적인 기준
 * 1. diffSeconds로 전달된 값보다 -1초 부터 시작함. (3초 전달하면 화면은 0:02 부터 시작)
 * 2. 화면에 0초가 보이고 1초가 더 지나야 status가 terminated 됨.
 * ==> 실질적으로 diffSeconds 값만큼 타이머가 동작됨.
 *
 * 이렇게 된 이유는 딜레마가 있음.
 * 2.99초 ~ 2.01초 사이를 몇으로 보여줄것인가? ==> 2초로 보여주기로 했기 때문에 위와같이 했음.
 */
export function useDiffTimer({diffSeconds, onTerminated, beforeStart, format = defaultDiffTimerFormat}: DiffTimerOption) {
  const [expiredTimestamp, setExpiredTimestamp] = useState<number>();

  const start = useCallback(() => {
    beforeStart?.();
    setExpiredTimestamp(Date.now() + diffSeconds * 1000);
  }, [beforeStart, diffSeconds]);

  // pause 느낌도 아니고, stop 보다는 initialize 느낌이 강해서 이름을 이렇게 지었음.
  const initialize = useCallback(() => {
    setExpiredTimestamp(undefined);
  }, []);

  const {snapshotTimestamp, status} = useExpiredTimer({
    expiredTimestamp: expiredTimestamp ?? 0,
    enabled: !!expiredTimestamp,
    onTerminated
  });

  const remainSeconds = (!expiredTimestamp || status !== 'proceeding') ? 0 : Math.floor((expiredTimestamp - snapshotTimestamp) / 1000);

  return {
    start,
    initialize,
    dateText: format(remainSeconds),
    status
  };
}

export interface PeriodTimerParam {
  // 이 기간값이 외부(API)에서 받아오는 경우를 대응하기위해 null, undefined 추가
  period: null | undefined | {
    startTimestamp: number;
    endTimestamp: number;
  };
  isLoading?: boolean; // period를 외부 (API)에서 받아오는 경우 로딩상태를 전달하기 위함
  proceedingFormat?: typeof defaultPeriodTimerProceedingFormat;
  futureFormat?: (remain: ReturnType<typeof calculateRemainTime>, futureTimestamp: number) => string;

  /**
   * 1. 타이머가 실행중이다가 종료되었거나,
   * 2. 애초에 기간부터가 종료일이 과거여서 시작도 못하는 경우
   * 이 콜백함수가 실행됨.
   * (= 시작일이 미래인 경우에는 실행되지 않음)
   */
  onTerminated?: ExpiredTimerParam['onTerminated'];
}

export interface PeriodTimerResult {
  isProceeding: boolean;
  isFuture: boolean;
  isTerminated: boolean; // true인 경우는 종료일이 과거인 경우임. 즉, 시작일이 미래인 경우에는 false임.
  proceedingText: '' | string; // 진행중이 아니면 빈문자열, ex: '2일 12 : 37 : 00'
  futureText: '' | string; // 진행중이 아니면 빈문자열, ex: '01-22 OPEN'
}

/**
 * 시작일, 종료일이 있고 종료일까지 얼마나 남았는지에 대한 값을 반환함.
 *
 * @param period 시작일이 현재보다 크거나, 종료일이 현재보다 작더라도 예외처리 그에맞게 다 되어있음.
 * @param format 일, 시, 분, 초 값으로 문자열을 반환해야하는 함수
 * @return isProceeding 진행중 여부 (아직 시작안했거나, 종료된 경우 false)
 *
 * 예외케이스 2가지
 * 1. 종료일이 현재보다 작은경우 (과거에 이미 종료된 케이스) ==> 계속 종료상태
 * 2. 시작일이 현재보다 큰 경우 (미래에 시작될 케이스) ==> 시작일이 된 시점에 타이머 시작
 */
export function usePeriodTimer(param: PeriodTimerParam): PeriodTimerResult {
  const {
    period,
    proceedingFormat = defaultPeriodTimerProceedingFormat,
    futureFormat = defaultPeriodTimerFutureFormat,
    onTerminated,
    isLoading
  } = param;
  const timeoutId = useRef<NodeJS.Timeout>();
  const currentTimestamp = Date.now();
  const periodState = getPeriodState(currentTimestamp, period);

  // 처음부터 period가 존재하는 케이스
  const initialEnabled = !!period && isLoading !== true;
  const [enabled, setEnabled] = useState(initialEnabled);

  useEffect(() => {
    if (isLoading) {
      setEnabled(false);
      return;
    }

    if (periodState === 'past') {
      return;
    }

    /**
     * 처음부터 period가 존재하지않아서 (API로 부터 기간을 받아오는 케이스)
     * 나중에 리렌더링되고 나서야 effect가 실행되는 케이스
     */
    if (periodState === 'proceeding') {
      setEnabled(true);
      return;
    }

    // future case는 최초 렌더링시점, 또는 나중에 리렌더링 시점에 미래인 경우, 미래에 도달한 시점에 타이머가 실행될 수 있도록 콜백함수 예약
    timeoutId.current = runCallbackInFuture(period?.startTimestamp as number, function() {
      setEnabled(true);
    });

    return () => {
      clearTimeout(timeoutId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodState, isLoading]);

  const {snapshotTimestamp, status} = useExpiredTimer({
    expiredTimestamp: (!enabled || !period) ? 0 : period.endTimestamp,
    enabled,
    onTerminated: periodState === 'future' ? undefined : onTerminated // 시작일이 미래인 경우에는 실행되지 않도록 하기위함.
  });

  const proceedingResult = (!enabled || status !== 'proceeding' || !period) ? null : calculateRemainTime(snapshotTimestamp, period.endTimestamp);
  const futureResult = periodState !== 'future' ? null : calculateRemainTime(currentTimestamp, period?.startTimestamp as number);

  return {
    isProceeding: status === 'proceeding',
    isFuture: periodState === 'future',
    isTerminated: periodState === 'future' ? false : status === 'terminated',
    proceedingText: !proceedingResult ? '' :  proceedingFormat(proceedingResult),
    futureText: !futureResult ? '' : futureFormat(futureResult, period?.startTimestamp as number)
  };
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
// 오직 시작일, 종료일 기간으로만 계산하는 Period의 State
function getPeriodState(currentTimestamp: number, period: PeriodTimerParam['period']) {
  if (!period) {
    return null;
  }

  if (currentTimestamp > period.endTimestamp) {
    return 'past';
  }

  if (currentTimestamp < period.startTimestamp) {
    return 'future';
  }

  return 'proceeding';
}

function defaultDiffTimerFormat(remainSeconds: number) {
  return `${Math.floor(remainSeconds / 60)}:${String(remainSeconds % 60).padStart(2, '0')}`;
}

function calculateRemainTime(currentTimestamp: number, endTimestamp: number) {
  const now = dayjs(currentTimestamp);
  const end = dayjs(endTimestamp);
  const diff = end.diff(now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds
  };
}

function defaultPeriodTimerProceedingFormat({days, hours, minutes, seconds}: ReturnType<typeof calculateRemainTime>) {
  return `${days}일 ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
}

/**
 * 총 2가지 스타일의 [미래 시작 전] 날짜 표기가능.
 * 1. 잔여시간 표기 (n일 n시 n분 n초 뒤 시작된다) ==> 1st parameter
 * 2. 날짜 표기 (MM월 DD일에 시작한다) ==> 2nd parameter
 */
function defaultPeriodTimerFutureFormat(_: ReturnType<typeof calculateRemainTime>, futureTimestamp: number) {
  return dayjs(futureTimestamp).format('MM-DD') + ' START';
}

interface ExpiredTimerParam {
  expiredTimestamp: number;
  enabled?: boolean;

  /**
   * 1. 첫 실행시점 부터 종료상태였거나,
   * 2. 진행중이다 종료가 되었으면
   * 호출됨.
   */
  onTerminated?: (expiredTimestamp: number) => void
}

/**
 * proceeding = 타이머 진행중
 * terminated = 타이머가 시작안했거나 종료됨
 * pending = terminated ==> proceeding 되기 직전 그 사이 상태
 */
type TimerStatus = 'proceeding' | 'terminated' | 'pending';

/**
 * @return snapshotTimestamp은, 타이머 UI에 노출되야하는 시간의 timestamp를 뜻함.
 * 만약, 타이머가 쭉 진행되다 expiredTimestamp에 다다르면, snapshopTimestamp이 정확히 expiredTimestamp와 똑같은 값으로 반환됨.
 */
function useExpiredTimer({expiredTimestamp, enabled = true, onTerminated}: ExpiredTimerParam) {
  const previousExpiredTimestamp = usePrevious(expiredTimestamp);

  const intervalId = useRef<NodeJS.Timeout>();
  const [snapshotTimestamp, setSnapshotTimestamp] = useState<number>(); // 화면에 노출되는 시각 값 (1초마다 최신화됨)

  const status: TimerStatus = (!enabled) ? 'terminated' : (!snapshotTimestamp || (previousExpiredTimestamp !== expiredTimestamp)) ? 'pending' : expiredTimestamp <= snapshotTimestamp ? 'terminated' : 'proceeding';
  const previousStatus = usePrevious(status);

  useEffect(() => {
    /**
     * 여기 때문에 diff timer에서 아주약간의 시간 오차가 생김. (이 hooks 실행되고나서 effect가 실행되는 그 사이값 만큼)
     *
     * 1. useDiffTimer에서는 start() 에서 Date.now()로 expiredTimestamp를 만들고,
     * 2. 그럼 이 hooks가 실행되고,
     * 3. 그럼 이 effect가 뒤늦게 실행되는데
     * 2~3만큼의 시간차가 생김.
     *
     * 하지만 그 사이가 1초이상 걸리지 않기때문에, expired를 3초로 설정하면 snapshot은 약간 더 증가한 1초 미만의 값이 될거고,
     * 그럼 그 차이값은 2.x초가 될거라서 지장은 없음.
     */
    setSnapshotTimestamp(enabled ? Date.now() : undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, expiredTimestamp]);

  useEffect(() => {
    if (!snapshotTimestamp) {
      return;
    }

    const isTerminated = expiredTimestamp <= snapshotTimestamp;

    if (isTerminated || !enabled) {
      clearInterval(intervalId.current);
      return;
    }

    intervalId.current = setInterval(() => {
      setSnapshotTimestamp((prevState) => {
        if (!prevState) {
          return Date.now();
        }

        if (prevState + 1000 >= expiredTimestamp) {
          return expiredTimestamp;
        }

        return prevState + 1000;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, snapshotTimestamp]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if ((previousStatus !== 'terminated') && status === 'terminated') {
      onTerminated?.(expiredTimestamp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Type Guard를 위해 굳이 이렇게 if문으로 나눴음
  if (status === 'proceeding') {
    return {
      snapshotTimestamp: snapshotTimestamp as number,
      status
    };
  } else {
    return {
      status
    };
  }
}
