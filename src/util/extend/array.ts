import type {Direction} from '@util/custom-hooks/useSortButton';

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

export function sortByNumber<T>(direction: Direction, list: T[], valueExtractor: (item: T) => number) {
  return [...list].sort((a, b) => {
    if (direction === 'asc') {
      return valueExtractor(a) - valueExtractor(b);

    } else {
      return valueExtractor(b) - valueExtractor(a);
    }
  });
}

export function sortByString<T>(direction: Direction, list: T[], valueExtractor: (item: T) => string) {
  return [...list].sort((a, b) => {
    const valueA = valueExtractor(a);
    const valueB = valueExtractor(b);

    if(valueA > valueB) {
      return direction === 'desc' ? -1 : 1;

    } else if (valueA < valueB) {
      return direction === 'desc' ? 1 : -1;

    } else {
      return 0;
    }
  });
}
