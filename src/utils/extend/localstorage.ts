interface LocalStorageManager<T> {
  setItem: (value: T) => void;
  getItem: () => T | null;
  removeItem: () => void;
}

function getLocalStorageManager<T>(key: string): LocalStorageManager<T> {
  
  return {
    setItem: function (value: T) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: function () {
      const value = localStorage.getItem(key);
      return value === null ? null : JSON.parse(value);
    },
    removeItem: function () {
      localStorage.removeItem(key);
    }
  };
}

export interface SomeType {
  value: any;
}

export function getSomeLocalStorageManager() {
  return getLocalStorageManager<SomeType>('SOME_KEY');
}
