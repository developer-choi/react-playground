import {useEffect, useRef} from 'react';

export interface ClickOutsideParam {
  callback: (event: MouseEvent) => void;
  ignoreClassName?: string;
  debug?: string;
}

/**
 * https://stackoverflow.com/a/42234988
 * 1. 바깥을 클릭하면 callback이 실행됨.
 * 2. 안쪽을 클릭하거나, ignoreClassName과 일치하면 무시됨.
 */
export function useClickOutside<T extends HTMLElement>({callback, ignoreClassName, debug = ''}: ClickOutsideParam) {
  const wrapperRef = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) {
        return;
      }

      if (!event.target) {
        throw new Error('Unexpected error occurred. event.target is null');
      }

      const target = event.target as HTMLElement;

      const isMatchIgnoreClassName = !!ignoreClassName && target.classList.contains(ignoreClassName);
      const isInside = wrapperRef.current.contains(target);
      const isIgnore = isMatchIgnoreClassName || isInside;

      if (isIgnore) {
        return;
      }

      callback(event);
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, debug, ignoreClassName]);

  return {
    wrapperRef,
    ignoreClassName
  };
}
