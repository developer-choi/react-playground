import {range} from '@util/extend/number';

export function replace<T>(array: Array<T>, condition: (value: T, index: number, array: Array<T>) => boolean, replaceValue: T) {
  
  return array.map((value, index, original) => {
    if (condition(value, index, original)) {
      return replaceValue;
      
    } else {
      return value;
    }
  });
}

/**
 * 배열에서 n개씩 잘라서 반환하는 함수.
 * @example ([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
 * @example ([1, 2, 3, 4, 5], 6) => [[1, 2, 3, 4, 5]]
 */
export function splitIntoPieces<T>(array: T[], splitLength: number): T[][] {
  const arrayLength = array.length;
  const splitCount = (arrayLength === 0 || arrayLength % splitLength === 0) ? Math.floor(arrayLength / splitLength) : Math.floor(arrayLength / splitLength) + 1;
  return new Array(splitCount).fill('').map((value, index) => array.slice(index * splitLength, (index + 1) * splitLength));
}

/**
 * 배열을 균등하게 분할함.
 * 배열안에 연속적인 시간에 대한 요소가 100개있는데, 이중에 10개만을 보여주고 싶을 때 사용.
 * @example ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3) => [1, 5, 10]
 */
export function splitEvenly<T>(array: T[], maxSize: number): T[] {
  
  const arrayLength = array.length;
  
  if (arrayLength <= maxSize) {
    return array;
  }
  
  const overCount = arrayLength - maxSize; //1이상
  const magic = arrayLength / (overCount + 1);
  const removeIndexes = range(1, overCount).map(value => Math.floor(value * magic));
  
  return array.filter((value, index) => !removeIndexes.includes(index));
}

export function removeDuplicatedItems<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
