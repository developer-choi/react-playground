import {useCallback, useEffect} from 'react';

export function useOnScrollEnd(scrollElement: HTMLElement, callback: Function, correctValue = 0) {

  const handleScroll = useCallback(() => {

    const {scrollTop, clientHeight, scrollHeight} = scrollElement;
    const dist = scrollHeight - clientHeight - scrollTop;

    const absDist = Math.abs(dist);
    const absCorrectValue = Math.abs(correctValue);

    if (absDist <= absCorrectValue) {
      callback();
    }

  }, [scrollElement, callback, correctValue]);

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
}
