import {getDiffDate} from '@/utils/extend/date/util';
import {useEffect} from 'react';

/**
 * @param futureTimestamp 미래의 timestamp
 * @param callback 미래에 실행할 콜백
 * @return NodeJS.Timeout
 * @description 미래에, 전달한 timestamp가 되면, callback을 실행합니다.
 * 반드시, 필요없는 경우 clearTimeout를 호출해야합니다.
 */
export function runCallbackInFuture(futureTimestamp: number, callback: () => void) {
  const timeout = futureTimestamp - Date.now();

  if (timeout < 0) {
    console.warn('futureTimestamp is not more future than present. The callback is not executed.');
    return;
  }

  return setTimeout(callback, timeout);
}

/**
 * 내일 자정이 되면 전달받은 callback을 실행합니다.
 * 그 외 내용은 runCallbackInFuture()와 동일합니다.
 */
export function runCallbackInMidnight(callback: () => void) {
  const midnight = getDiffDate(new Date(), [0, 0, 1]);
  return runCallbackInFuture(midnight.getTime(), callback);
}

/**
 * runCallbackInFuture() 에서 이 hooks가 호출된 이후 unmount 될 때 clearTimeout()를 추가한 함수입니다.
 * 그 외 내용은 동일합니다.
 */
export function useRunCallbackInFuture(futureTimestamp: number, callback: () => void) {
  useEffect(() => {
    const timeoutId = runCallbackInFuture(futureTimestamp, callback);
    
    return () => {
      clearTimeout(timeoutId);
    }
  }, [callback, futureTimestamp]);
}

/**
 * runCallbackInMidnight() 에서 이 hooks가 호출된 이후 unmount 될 때 clearTimeout()를 추가한 함수입니다.
 * 그 외 내용은 동일합니다.
 */
export function useRunCallbackInMidnight(callback: () => void) {
  useEffect(() => {
    const timeoutId = runCallbackInMidnight(callback);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [callback]);
}
