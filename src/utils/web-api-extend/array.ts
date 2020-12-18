import {getNumberArray} from './number';

export function replace<T>(array: Array<T>, condition: (value: T, index: number, array: Array<T>) => boolean, replaceValue: T) {

  return array.map((value, index, original) => {
    if (condition(value, index, original)) {
      return replaceValue;

    } else {
      return value;
    }
  });
}

export function split<T>(array: T[], splitLength: number): T[][] {
  const arrayLength = array.length;
  const splitCount = (arrayLength === 0 || arrayLength % splitLength === 0) ? Math.floor(arrayLength / splitLength) : Math.floor(arrayLength / splitLength) + 1;
  return new Array(splitCount).fill('').map((value, index) => array.slice(index * splitLength, (index + 1) * splitLength));
}

export function divide<T>(array: T[], maxSize: number): T[] {

  const arrayLength = array.length;

  if (arrayLength <= maxSize) {
    return array;
  }

  const overCount = arrayLength - maxSize; //1이상
  const magic = arrayLength / (overCount + 1);
  const removeIndexes = getNumberArray(1, overCount).map(value => Math.floor(value * magic));

  return array.filter((value, index) => !removeIndexes.includes(index));
}
