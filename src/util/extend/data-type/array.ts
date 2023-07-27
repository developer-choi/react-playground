import type {Direction} from '@type/response-sub/common-sub';

export const EMPTY_ARRAY = [];

type LoopCallback<I, R> = (item: I, index: number, array: Array<I>) => R;

export function replace<T>(array: Array<T>, conditionCallback: LoopCallback<T, boolean>, replaceCallback: (item: T) => T) {
  return array.map((item, index, original) => {
    if (conditionCallback(item, index, original)) {
      return replaceCallback(item);
    } else {
      return item;
    }
  });
}

// 루프돌려서 콜백에서 반환한 값을 그대로 반환
export function findItem<I, R>(list: I[], resultCallback: LoopCallback<I, R | false>): R | undefined {
  for (let i = 0 ; i < list.length ; i++) {
    const item = list[i];
    const result = resultCallback(item, i, list);

    if (result === false) {
      continue;
    }

    return result;
  }

  return undefined;
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

  const map = new Map<P, I>();

  _items.forEach(item => {
    const pk = pkExtractor(item);
    map.set(pk, item);
  });

  const result = Array.from(map).map(([, item]) => item);

  if (recent === 'last') {
    return result;
  }

  return result.reverse();
}

export function popSpecificIndex<T>(array: T[], index: number) {
  const copy = [...array];
  const item = copy[index];
  copy.splice(index, 1);

  return {
    rest: copy,
    item
  };
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

export function flatRecursive<T, K extends keyof T>(list: T[], childrenKey: K): T[] {
  return list.reduce((a, b) => {
    const children = b[childrenKey]

    if (children) {
      if(!Array.isArray(children)) {
        throw new Error('childrenKey is invalid. value of childrenKey is must Array')
      }

      return a.concat(b, flatRecursive(children as T[], childrenKey));
    }

    return a.concat(b);
  }, [] as T[])
}
