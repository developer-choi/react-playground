import {useCallback, useEffect, useState} from 'react';

interface LocalStorageObjectParameter<V extends Object> {
  key: string;

  /**
   * 애초에 매니저 생성할 때부터 유효성검증로직을 선택적으로 추가하여,
   * LocalStorage에 값을 읽거나 쓸때 유효하지않은값이 읽히거나 써지지않도록 함.
   */
  validateCallback?: (parsedValue: any) => boolean;
  defaultValue?: V;
}

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
  private readonly validateCallback: LocalStorageObjectParameter<V>['validateCallback'];

  constructor({key, validateCallback, defaultValue}: LocalStorageObjectParameter<V>) {
    this.key = key;
    this.validateCallback = validateCallback;

    if (defaultValue && !this.getItem()) {
      this.setStringifyItem(defaultValue);
    }
  }

  /**
   * @private
   * Instead of this private method, use setStringifyItem().
   */
  private setItem(value: string) {
    try {
      localStorage.setItem(this.key, value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @private
   * Instead of this private method, use parseItem().
   */
  private getItem() {
    try {
      return localStorage.getItem(this.key);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  setStringifyItem(value: V) {
    if (this.validateCallback && !this.validateCallback(value)) {
      throw new Error('setStringifyItem() is failed. because you set the validateCallback but the value is invalidated.');
    }

    try {
      this.setItem(JSON.stringify(value));
    } catch (error) {
      if (!(error instanceof ReferenceError)) {
        throw error;
      }
    }
  }

  getParsedData() {
    try {
      const item = this.getItem();

      if (item === null) {
        return null;
      }

      const parsedItem = JSON.parse(item);

      if (!this.validateCallback) {
        return parsedItem;
      }

      /**
       * 대부분의 걍우, LocalStorage에 개발자가 값을 저장할 때 유효한 형태로 저장을 하게되어,
       * 유효하지않은 값이 저장될일이 잘 없음.
       *
       * 하지만, 유효하지않은 값이 저장될 가능성자체는 존재함.
       * 1. 유저가 수정한경우
       * 2. 개발자가 실수한경우
       *
       * 이런경우 해당 키로된 데이터를 아예 삭제해서 처음부터 로직을 다시 탈 수 있도록 함.
       */
      if (!this.validateCallback(parsedItem)) {
        localStorage.removeItem(this.key);
        console.error(`The data of ${this.key} is not validated. this data is cleared.`);
        return null;
      }

      return parsedItem;
    } catch (error) {
      console.error(error);
      localStorage.removeItem(this.key);
      return null;
    }
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
      setState(manager.getParsedData());
    }
  }, [enabled, manager]);

  const changeState = useCallback((value: V) => {
    if (!enabled) {
      return;
    }

    try {
      manager.setStringifyItem(value);
      setState(value);
    } catch (error) {
      console.error(error);
    }
  }, [enabled, manager]);

  return {
    state,
    changeState
  };
}
