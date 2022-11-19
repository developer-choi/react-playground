import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from 'react';
import {useEffectFromTheSecondTime} from '@util/custom-hooks/useEffectFromTheSecondTime';

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

export type PkType = string | number;

export interface ArrayManagerConstructorParameter<I, P extends PkType> {
  key: string;
  pkExtractor: (item: I) => P;
  enableDuplicated: boolean;
}

export class LocalStorageArrayManager<I, P extends PkType> extends LocalStorageObjectManager<I[]> {
  /**
   * @private The pkExtractor must not be accessible in public.
   * And I don't have any plan that makes derived classes extend this class. (= This is the reason that I don't set visibility to protected)
   * For the above two reasons, I set visibility to private.
   */
  private readonly pkExtractor: ArrayManagerConstructorParameter<I, P>['pkExtractor'];
  private readonly enableDuplicated: ArrayManagerConstructorParameter<I, P>['enableDuplicated'];

  constructor({key, enableDuplicated, pkExtractor}: ArrayManagerConstructorParameter<I, P>) {
    super(key);
    this.pkExtractor = pkExtractor;
    this.enableDuplicated = enableDuplicated;
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

  private removeDuplicatedItems(originalItems: I[]): I[] {
    const record = originalItems.reduce((a, b) => {
      const pk = this.pkExtractor(b);
      // eslint-disable-next-line no-param-reassign
      a[pk] = b;
      return a;
    }, {} as Record<P, I>);

    return Object.entries<I>(record).map(([, item]) => item);
  }

  appendLast(item: I): I[] {
    const items = [...this.parseItem(), item];
    const list = this.enableDuplicated ? items : this.removeDuplicatedItems(items);
    this.setStringifyItem(list);
    return list;
  }

  appendFirst(item: I): I[] {
    const items = [item, ...this.parseItem()];
    const list = this.enableDuplicated ? items : this.removeDuplicatedItems(items);
    this.setStringifyItem(list);
    return list;
  }
}

export function useLocalStorageObjectManager<V extends Object>(manager: LocalStorageObjectManager<V>, enabled = true) {
  const [state, setState] = useState<V | null>(null);

  useEffect(() => {
    if (enabled) {
      setState(manager.parseItem());
    }
  }, [enabled, manager]);

  useEffectFromTheSecondTime(useCallback(() => {
    if (!enabled) {
      return;
    }
    
    if (state !== null) {
      manager.setStringifyItem(state);
    }
  }, [enabled, manager, state]));

  return [state, setState] as [V | null, Dispatch<SetStateAction<V>>];
}

export function useLocalStorageArrayManager<I, P extends PkType>({key, enableDuplicated, pkExtractor}: ArrayManagerConstructorParameter<I, P>, enabled = true) {
  const manager = useMemo(() => new LocalStorageArrayManager({
    key,
    enableDuplicated,
    pkExtractor

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [key, enableDuplicated]);

  const [state, setState] = useLocalStorageObjectManager(manager, enabled) as [I[], Dispatch<SetStateAction<I[]>>];

  const appendFirst = useCallback((item: I) => {
    setState(manager.appendFirst(item));
  }, [manager, setState]);

  const appendLast = useCallback((item: I) => {
    setState(manager.appendLast(item));
  }, [manager, setState]);

  const removeByPk = useCallback((pk: P) => {
    setState(manager.removeByPk(pk));
  }, [manager, setState]);

  return {
    list: state ?? [],
    appendFirst,
    appendLast,
    removeByPk
  };
}
