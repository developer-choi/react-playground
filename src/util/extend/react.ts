import {EffectCallback, useCallback, useEffect, useRef, useState} from 'react';

export function useForceReRender() {
  const [, setValue] = useState(false);
  
  return useCallback(() => {
    setValue(prevState => !prevState);
  }, []);
}

export function useIsFirstRender() {
  const ref = useRef(true);
  useEffect(() => {
    ref.current = false;
  }, []);
  return ref.current;
}

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

export function useLogMount(name: string) {
  useEffect(() => {
    console.log(`${name} mounted`);

    return () => {
      console.log(`${name} unmounted`);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prevState => !prevState);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse
  };
}
