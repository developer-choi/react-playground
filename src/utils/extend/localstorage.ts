interface LocalStorageManager<T> {
  setItem: (value: T) => void;
  getItem: () => T;
  removeItem: () => void;
}

function getLocalStorageManager<T>(key: string) {
  
  return {
    setItem: function (value: T) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: function () {
      localStorage.getItem(key);
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
