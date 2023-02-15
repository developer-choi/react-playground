import type {BaseSyntheticEvent} from 'react';
import {useEffect, useRef} from 'react';

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

// https://stackoverflow.com/a/42234988
export function useClickOutside<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as any)) {
        alert("You clicked outside.");
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return ref;
}
