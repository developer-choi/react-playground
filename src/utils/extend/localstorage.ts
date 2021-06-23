import {useCallback, useEffect, useState} from 'react';
import useIsFirstMount from '../custom-hooks/useIsFirstMount';

/**
 * 로컬스토리지에 저장되는 모든값의 타입을 여기에 저장하여 관리될 수 있도록 한다.
 */
export interface LocalStorageRecord {
  somekey1: string;
  someKey2: {
    hello: string;
  };
}

export function useLocalStorage<K extends keyof LocalStorageRecord>(key: K) {
  const isFirstRender = useIsFirstMount();
  const [state, setState] = useState<LocalStorageRecord[K] | undefined>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  });
  
  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    
    if (state === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, state]);
  
  const removeItem = useCallback(() => {
    setState(undefined);
  }, []);
  
  return {
    state,
    setState,
    removeItem
  };
}
