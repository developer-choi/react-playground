import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import type {LocalStorageObjectManager} from '../extend/localStroage';

export function useLocalStorage<V extends Object>(manager: LocalStorageObjectManager<V>) {
  const [value, setValue] = useState<V | null>(() => manager.parseItem());
  
  useEffect(() => {
    if (value !== null) {
      console.log('setStringifyItem', value);
      manager.setStringifyItem(value);
    }
  }, [value, manager]);
  
  return [value, setValue] as [V | null, Dispatch<SetStateAction<V>>];
}
