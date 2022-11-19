import {EffectCallback, useEffect} from "react";
import useIsFirstRender from "@util/custom-hooks/useIsFirstRender";

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
