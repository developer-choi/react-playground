import {useEffect} from 'react';

export default function useBlurActiveElement(toggle: boolean) {

  useEffect(() => {
    if (toggle) {
      //@ts-ignore
      document.activeElement?.blur();
    }
  }, [toggle]);
}
