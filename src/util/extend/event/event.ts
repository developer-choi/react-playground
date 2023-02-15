import type {BaseSyntheticEvent} from 'react';
import {useEffect, useRef} from 'react';
import {debugLog} from '@util/extend/test';

export function preventDefault(event: BaseSyntheticEvent) {
  event.preventDefault();
}

export function stopPropagation(event: BaseSyntheticEvent) {
  event.stopPropagation();
}

export function preventClick(event: BaseSyntheticEvent) {
  preventDefault(event);
  stopPropagation(event);
}

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

      const isMatchIgnoreClassName = ignoreClassName && target.classList.contains(ignoreClassName);
      const isInside = wrapperRef.current.contains(target);
      const isIgnore = isMatchIgnoreClassName || isInside;

      if (isIgnore) {
        if (isMatchIgnoreClassName) {
          debugLog({
            debug: !!debug,
            messages: `${debug} ignored because isMatchIgnoreClassName true`
          });
        }
        if (isInside) {
          debugLog({
            debug: !!debug,
            messages: `${debug} ignored because isInside true`
          });
        }
        return;
      }

      debugLog({
        debug: !!debug,
        messages: `${debug} clicked outside`
      });

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
