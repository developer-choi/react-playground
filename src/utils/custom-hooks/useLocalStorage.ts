import {useCallback} from 'react';

interface LocalStorageManager<T> {
  setItem: (value: T) => void;
  getItem: () => T;
  removeItem: () => void;
}

function useLocalStorageManager<T>(key: string) {
  const setItem = useCallback((value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key]);
  
  const getItem = useCallback(() => {
    return localStorage.getItem(key);
  }, [key]);
  
  const removeItem = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);
  
  return {
    setItem,
    getItem,
    removeItem
  };
}

export interface SomeType {
  value: any;
}

export function useSomeLocalStorageManager() {
  return useLocalStorageManager<SomeType>('SOME_KEY');
}
