import {popSpecificIndex} from "@util/extend/data-type/array";

/**
 * @example (0, 3) --> -2이상 3이하의 랜덤한 숫자 반환
 * @example (3, -2) --> -2이상 3이하의 랜덤한 숫자 반환
 */
export function randomNumber(from: number, to: number) {
  const _max = Math.max(from, to);
  const _min = Math.min(from, to);
  const length = Math.abs(_max - _min) + 1;
  return Math.floor(Math.random() * length) + _min;
}

export function randomBoolean(percent: number = 50): boolean {
  return Math.random() > (100 - percent) / 100;
}

/**
 * @param anagramArray 랜덤한 문자열을 만들 때 들어갈 요소들
 * @param length 랜덤한 문자열의 길이
 *
 * @example (['a', 'b', 'c'], 5) ==> return 'aabac'
 */
export function makeRandomString(anagramArray: Array<string | number>, length: number): string {
  let result = new Array<string>(length);

  for (let i = 0; i < length; i++) {
    let randomIndex = randomNumber(0, anagramArray.length - 1);
    result.push(String(anagramArray[randomIndex]));
  }

  return result.join("");
}

export function randomIndex(array: any[]): number {
  return randomNumber(0, array.length - 1);
}

export function randomInArray<T>(array: T[]): T {
  const index = randomIndex(array);
  return array[index];
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [] as T[];

  array.reduce((a) => {
    const index = randomIndex(a);
    const {item, rest} = popSpecificIndex(a, index);
    result.push(item);
    return rest;
  }, array);

  return result;
}

export function randomHexColor() {
  return (
    "#" +
    new Array(6)
      .fill("")
      .map(() => randomNumber(1, 2 ** 4 - 1).toString(16))
      .join("")
  );
}
