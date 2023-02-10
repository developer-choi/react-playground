import {useEffect, useRef} from 'react';

export default function useClickOutside<T extends HTMLElement>() {
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
