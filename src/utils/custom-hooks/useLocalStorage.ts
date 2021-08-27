import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import type {LocalStorageArrayManager, LocalStorageObjectManager} from '../extend/localStroage';

export function useLocalStorageObjectManager<V extends Object>(manager: LocalStorageObjectManager<V>) {
  const [state, setState] = useState<V | null>(() => manager.parseItem());
  
  useEffect(() => {
    if (state !== null) {
      manager.setStringifyItem(state);
    }
  }, [state, manager]);
  
  return [state, setState] as [V | null, Dispatch<SetStateAction<V>>];
}

export function useLocalStorageArrayManager<E, P>(manager: LocalStorageArrayManager<E, P>) {
  const [state, setState] = useLocalStorageObjectManager(manager);
  
  /**
   * If the localStorage's key is empty, this will return an empty array.
   * Because of LocalStorageArrayManager's parseItem() is overridden.
   */
  return [state, setState] as [E[], Dispatch<SetStateAction<E[]>>];
}
