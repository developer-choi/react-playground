import {getLocalStorageCoreManager} from './localstorage-object';

export interface LocalStorageArrayManager<T> {
  setItem: (value: T[]) => void;
  getItem: () => T[];
  removeItem: () => void;
  pushItem: (value: T) => void;
}

export function getLocalStorageArrayManager<T>(key: string): LocalStorageArrayManager<T> {
  const {getItem, setItem, removeItem} = getLocalStorageCoreManager<T[]>(key);
  
  return {
    pushItem: function (value) {
      const prevValue = getItem();
      
      if (prevValue === null) {
        setItem([value]);
      } else if (!Array.isArray(prevValue)) {
        console.error(`${key}로 저장된 값이 배열이 아닙니다. 로컬스트로지에 저장된 값이 배열일 경우, ${getLocalStorageArrayManager.name}()을 사용하세요.`);
      } else {
        setItem([...prevValue, value]);
      }
    },
    getItem: function () {
      return getItem() ?? [];
    },
    setItem,
    removeItem
  };
}

/**
 * Examples
 */

interface SomeListItem {
  name: string;
  value: string;
}

interface LocalStorageArrayMap {
  someList: SomeListItem[];
}

export function getLocalStorageArrayPreset<T extends keyof LocalStorageArrayMap>(key: T) {
  return getLocalStorageArrayManager<LocalStorageArrayMap[T][any]>(key);
}
