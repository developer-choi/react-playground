export function getLocalstorageItem<T>(key: string, defaultValue: T): T {
  const result = localStorage.getItem(key);
  return result === null ? defaultValue : JSON.parse(result);
}
