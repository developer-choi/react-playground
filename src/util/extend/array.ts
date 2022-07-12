export const EMPTY_ARRAY = [];

export function replace<T>(array: Array<T>, condition: (value: T, index: number, array: Array<T>) => boolean, replaceValue: T) {
  
  return array.map((value, index, original) => {
    if (condition(value, index, original)) {
      return replaceValue;
      
    } else {
      return value;
    }
  });
}

export function removeDuplicatedItems<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
