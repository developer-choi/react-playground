import type {Direction} from '@type/response-sub/common-sub';

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

export function removeDuplicatedItems<T extends string | number>(array: T[]): T[] {
  return Array.from(new Set(array));
}

export type PkType = string | number;

/**
 * @param items 중복을 제거하고싶은 배열
 * @param pkExtractor 배열의 PK를 추출하는 함수
 * @param recent 'first' = 배열 뒤에있는 중복을 삭제하고 앞에있는것을 남김
 * @param recent 'last' = 배열 앞에있는 중복을 삭제하고 뒤에있는것을 남김
 */
export function removeDuplicatedObject<I extends Object, P extends PkType>(items: I[], pkExtractor: (item: I) => P, recent: 'last' | 'first'): I[] {
  const _items = recent === 'last' ? items : [...items].reverse();

  const record = _items.reduce((a, b) => {
    const pk = pkExtractor(b);
    // eslint-disable-next-line no-param-reassign
    a[pk] = b;
    return a;
  }, {} as Record<P, I>);

  return Object.entries<I>(record).map(([, item]) => item);
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
