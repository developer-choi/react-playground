export type PkType = string | number;
export type Direction = 'asc' | 'desc';

export type LoopCallback<I, R> = (item: I, index: number, array: Array<I>) => R;

export function replace<T>(array: Array<T>, conditionCallback: LoopCallback<T, boolean>, replaceCallback: (item: T) => T) {
  return array.map((item, index, original) => {
    if (conditionCallback(item, index, original)) {
      return replaceCallback(item);
    } else {
      return item;
    }
  });
}

export function arraySplit<T>(list: T[], length: number): T[][] {
  const resultArray: T[][] = [];
  const resultLength = Math.ceil(list.length / length);

  for(let i = 0; i < resultLength; i++) {
    resultArray.push(list.slice(i * length, (i + 1) * length));
  }

  return resultArray;
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

export function removeDuplicatedItems<T extends string | number>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * @param items 중복을 제거하고싶은 배열
 * @param pkExtractor 배열의 PK를 추출하는 함수
 * @param recent 'first' = 배열 뒤에있는 중복을 삭제하고 앞에있는것을 남김
 * @param recent 'last' = 배열 앞에있는 중복을 삭제하고 뒤에있는것을 남김
 */
export function removeDuplicatedObject<I extends object, P extends PkType>(items: I[], pkExtractor: (item: I) => P, recent: 'last' | 'first'): I[] {
  const _items = recent === 'last' ? items : [...items].reverse();

  const object = {} as Record<P, I>

  _items.forEach(item => {
    const pk = pkExtractor(item);

    // 중복된 값을 덮어 쓰고나서 나중에 배열로 반환할 때 순서가 뒤바뀌는것을 방지
    delete object[pk];
    object[pk] = item;
  });

  const result = Object.entries(object).map(([, value]) => value) as I[];

  if (recent === 'last') {
    return result;
  }

  return result.reverse();
}
