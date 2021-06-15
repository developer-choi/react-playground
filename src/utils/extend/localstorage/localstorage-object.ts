export interface LocalStorageManager<T> {
  setItem: (value: T) => void;
  getItem: () => T | null;
  removeItem: () => void;
}

export function getLocalStorageCoreManager<T>(key: string): LocalStorageManager<T> {
  
  return {
    setItem: function (value: T) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: function getItem() {
      const value = localStorage.getItem(key);
      return value === null ? null : JSON.parse(value);
    },
    removeItem: function () {
      localStorage.removeItem(key);
    }
  };
}
