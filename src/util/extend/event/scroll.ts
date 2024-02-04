import {useEffect} from 'react';
import throttle from 'lodash/throttle';

interface InfiniteScrollParam {
  enabled?: boolean;
  offset?: number;
  callback: () => void;
}

export function useInfiniteScroll({enabled = true, offset = 500, callback}: InfiniteScrollParam) {
  useEffect(() => {
    const handler = throttle(() => {
      const {clientHeight, scrollHeight, scrollTop} = document.documentElement;

      if ((scrollHeight - clientHeight - scrollTop) <= offset) {
        callback();
      }
    }, 200);

    if (!enabled) {
      return () => {
        window.removeEventListener('scroll', handler);
      };
    }

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [callback, enabled, offset]);
}
