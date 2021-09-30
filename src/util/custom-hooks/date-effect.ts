import {useEffect} from 'react';
import {getDiffDate} from '@util/extend/date/date-util';

/**
 * @param futureTimestamp 미래의 timestamp
 * @param callback 미래에 실행할 콜백
 * 미래에, 전달한 timestamp가 되면, callback을 실행합니다.
 */
export function useDateEffect(futureTimestamp: number, callback: () => void) {
  useEffect(() => {
    const timeout = futureTimestamp - new Date().getTime();
  
    if (timeout < 0) {
      console.warn('futureTimestamp is not more future than present. The callback is not executed.');
      return;
    }
  
    const timeoutId = setTimeout(() => {
      callback();
    }, timeout);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, futureTimestamp]);
}

/**
 * @param callback 자정이 되면 실행할 콜백함수
 * 자정이 되면 전달받은 callback을 실행합니다.
 * 이후 이 hooks가 다시 실행되는 경우, 다시 자정을 계산해서 그 자정이 되면 다시 callback을 실행시킵니다.
 */
export function useMidnightEffect(callback: () => void) {
  const midnight = getDiffDate(new Date(), [0, 0, 1], 3);
  useDateEffect(midnight.getTime(), callback);
}
