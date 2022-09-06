import useIsFirstRender from '@util/custom-hooks/useIsFirstRender';
import {EffectCallback, useEffect} from 'react';

export function useEffectFromTheSecondTime(effect: EffectCallback) {
  const isFirstRendering = useIsFirstRender();
  
  useEffect(() => {
    if (isFirstRendering) {
      return;
    }
    
    effect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect]);
}
