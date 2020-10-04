import {useEffect} from 'react';

export function useToggleBodyScroll(toggle: boolean) {

  useEffect(() => {
    if(toggle) {
      document.body.style.overflow = "hidden";

    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);
}
