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
