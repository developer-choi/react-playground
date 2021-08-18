import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import type {LocalStorageArrayManager, LocalStorageManager, LocalStorageObjectManager} from '../extend/localStroage';

/**
 * I wanted to synchronize localStorage and state.
 * If the state is changed, localStorage must be also changed.
 * So I make this hooks.
 * But I don't know well whether this hooks is useful for LocalStorageManager and its derived classes.
 * Furthermore If I make custom-hooks for LocalStorageManager, Most of the code is duplicated.
 */
export function useLocalStorageManager(manager: LocalStorageManager) {
  const [state, setState] = useState<string | null>(() => manager.getItem());
  
  useEffect(() => {
    if (state !== null) {
      manager.setItem(state);
    }
  }, [state, manager]);
  
  return [state, setState] as [string | null, Dispatch<SetStateAction<string>>];
}

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
