import {useEffect} from 'react';

export function useEnableBodyScroll(enable: boolean) {

  useEffect(() => {
    if(enable) {
      document.body.style.overflow = "auto";

    } else {
      document.body.style.overflow = "hidden";
    }
  }, [enable]);
}
