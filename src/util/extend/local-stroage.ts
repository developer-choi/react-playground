import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {useEffectFromTheSecondTime} from '@util/custom-hooks/useEffectFromTheSecondTime';
import {removeDuplicatedItems} from '@util/extend/array';

export class LocalStorageObjectManager<V extends Object> {
  /**
   * @private
   * I think derived classes are need not access the key.
   * Instead, derived classes can use super's methods.
   */
  private readonly key: string;
  
  constructor(key: string, defaultValue?: V) {
    this.key = key;
    
    if (defaultValue) {
      try {
        if (!this.getItem()) {
          this.setStringifyItem(defaultValue);
        }
      } catch (error) {
        if (!(error instanceof ReferenceError)) {
          throw error;
        }
      }
    }
  }
  
  /**
   * @private
   * Instead of this private method, use setStringifyItem().
   */
  private setItem(value: string) {
    localStorage.setItem(this.key, value);
  }

  /**
   * @private
   * Instead of this private method, use parseItem().
   */
  private getItem() {
    return localStorage.getItem(this.key);
  }
  
  setStringifyItem(value: V) {
    this.setItem(JSON.stringify(value));
  }
  
  parseItem() {
    const item = this.getItem()
    return item ? JSON.parse(item) as V : null;
  }
}

export class LocalStorageArrayManager<I, P> extends LocalStorageObjectManager<I[]> {
  /**
   * @private The pkExtractor must not be accessible in public.
   * And I don't have any plan that makes derived classes extend this class. (= This is the reason that I don't set visibility to protected)
   * For the above two reasons, I set visibility to private.
   */
  private readonly pkExtractor: (item: I) => P;
  
  constructor(key: string, pkExtractor: (item: I) => P) {
    super(key);
    this.pkExtractor = pkExtractor;
  }

  parseItem(): I[] {
    try {
      const array = super.parseItem();

      if (array === null || !Array.isArray(array)) {
        return [];

      } else {
        return array;
      }
    } catch (error) {
      console.error('An empty array was returned because an error occurred while JSON.parse().', error);
      return [];
    }
  }
  
  removeByPk(pk: P): I[] {
    const list = this.parseItem().filter(prev => this.pkExtractor(prev) !== pk);
    this.setStringifyItem(list);
    return list;
  }
  
  appendLast(item: I, enableDuplicated: boolean): I[] {
    const items = [...this.parseItem(), item];
    const list = enableDuplicated ? items : removeDuplicatedItems(items);
    this.setStringifyItem(list);
    return list;
  }
  
  appendFirst(item: I, enableDuplicated: boolean): I[] {
    const items = [...this.parseItem(), item];
    const list = enableDuplicated ? items : removeDuplicatedItems(items);
    this.setStringifyItem(list);
    return list;
  }
}

export function useLocalStorageObjectManager<V extends Object>(manager: LocalStorageObjectManager<V>) {
  const [state, setState] = useState<V | null>(null);

  useEffect(() => {
    setState(manager.parseItem());
  }, [manager]);

  useEffectFromTheSecondTime(useCallback(() => {
    if (state !== null) {
      manager.setStringifyItem(state);
    }
  }, [manager, state]));

  return [state, setState] as [V | null, Dispatch<SetStateAction<V>>];
}

export function useLocalStorageArrayManager<I, P>(manager: LocalStorageArrayManager<I, P>) {
  const [state, setState] = useLocalStorageObjectManager(manager);

  const appendFirst = useCallback((item: I, enableDuplicated: boolean) => {
    setState(manager.appendFirst(item, enableDuplicated));
  }, [manager, setState]);

  const appendLast = useCallback((item: I, enableDuplicated: boolean) => {
    setState(manager.appendLast(item, enableDuplicated));
  }, [manager, setState]);

  const removeByPk = useCallback((pk: P) => {
    setState(manager.removeByPk(pk));
  }, [manager, setState]);

  return {
    list: state,
    appendFirst,
    appendLast,
    removeByPk
  };
}
