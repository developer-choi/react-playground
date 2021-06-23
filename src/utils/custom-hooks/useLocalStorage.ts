import {useCallback, useEffect, useState} from 'react';
import useIsFirstMount from './useIsFirstMount';

/**
 * 로컬스토리지에 저장되는 모든값의 타입을 여기에 저장하여 관리될 수 있도록 한다.
 */
export interface LocalStorageRecord {
  somekey1: string;
  someKey2: {
    hello: string;
  };
}

export default function useLocalStorage<K extends keyof LocalStorageRecord>(key: K) {
  const isFirstRender = useIsFirstMount();
  const [state, setState] = useState<LocalStorageRecord[K] | undefined>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  });
  
  useEffect(() => {
    /**
     * localStorage에 해당 key로 저장된값이 있건 없건 이 effect는 실행될 필요가 없기 떄문이다.
     *
     * Case1. 기존에 해당key로 저장된 값이 없는경우, 없는 key로 왜 removeItem()을 실행할 이유가없다.
     * Case2. 기존에 해당key로 저장된 값이 있는경우, 첫 렌더링때는 state와 로컬스토리지의 값이 데이터 형태만 다를뿐, 둘다 형태를 맞춰주면 동일한값이 되기때문에, 또 setItem을 할 이유가 없다.
     */
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
