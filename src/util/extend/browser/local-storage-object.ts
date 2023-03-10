import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {useEffectFromTheSecondTime} from '@util/extend/react';

/**
 * @description 로컬스토리지에 Object를 쉽고 안전하게 읽고 쓰기위해 만들었습니다.
 * 1. 매번 중복되는 코드를 제거하기 위해.
 * 2. localStorage의 key는 문자열이라서 오타로인해 잘못 읽고 쓸 우려가 있어서.
 */
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
    try {
      this.setItem(JSON.stringify(value));
    } catch (error) {
      if (!(error instanceof ReferenceError)) {
        throw error;
      }
    }
  }

  parseItem() {
    const item = this.getItem()
    return item ? JSON.parse(item) as V : null;
  }
}

export interface UseLocalStorageObjectManagerOption<V extends Object> {
  enabled?: boolean;
  defaultValue?: V | null;
}

/**
 * @description
 * LocalStorageObjectManager: 단순히 로컬스토리지에 읽고 쓰는것만 도와줍니다.
 * useLocalStorageObjectManager: 로컬스트토리지에 저장된 값이 변할때 화면도 따라 변하는것을 쉽게 구현하도록 도와줍니다.
 */
export function useLocalStorageObjectManager<V extends Object>(manager: LocalStorageObjectManager<V>, option?: UseLocalStorageObjectManagerOption<V>) {
  const {enabled = true, defaultValue = null} = option ?? {};
  const [state, setState] = useState<V | null>(defaultValue);

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
