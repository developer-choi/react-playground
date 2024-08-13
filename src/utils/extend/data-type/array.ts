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

export type Direction = 'asc' | 'desc';

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


/**
 * @example ([1, 2, 3], 1) => 2
 * @example ([1, 2, 3], 2) => 3
 * @example ([1, 2, 3], 3) => 1
 */
export function getNextLoopItem<T>(list: T[], item: T): T {
  const index = list.indexOf(item)

  if (index === -1) {
    console.error("item is not in list", item, list);
    return item
  }

  if (list.length === 1) {
    return item
  }

  const isLast = index === list.length - 1;

  if (isLast) {
    return list[0];

  } else {
    return list[index + 1];
  }
}
