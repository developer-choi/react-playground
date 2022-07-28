export const EMPTY_ARRAY = [];

export function replace<T>(array: Array<T>, conditionCallback: (item: T, index: number, array: Array<T>) => boolean, replaceCallback: (item: T) => T) {
  
  return array.map((item, index, original) => {
    if (conditionCallback(item, index, original)) {
      return replaceCallback(item);
    } else {
      return item;
    }
  });
}

export function removeDuplicatedItems<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
