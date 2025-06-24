import {randomNumber} from '@/utils/extend/random/index';
import {range} from '@/utils/extend/data-type/number';

/**
 * @param anagramArray 랜덤한 문자열을 만들 때 들어갈 요소들
 * @param length 랜덤한 문자열의 길이
 *
 * @example (['a', 'b', 'c'], 5) ==> return 'aabac'
 */
export function makeRandomString(anagramArray: Array<string | number>, length: number): string {
  const result = new Array<string>(length);

  for (let i = 0; i < length; i++) {

    const randomIndex = randomNumber(0, anagramArray.length - 1);
    result.push(String(anagramArray[randomIndex]));
  }

  return result.join('');
}

export function randomHexColor() {
  return '#' + new Array(6).fill('').map(() => randomNumber(1, 2 ** 4 - 1).toString(16)).join('');
}

export function randomRotatedNumberArray(length: number, sort: 'asc' | 'desc' = 'asc'): number[] {
  if (length <= 2) {
    throw new TypeError('length must be greater than 2');
  }

  const initialArray = sort === 'asc' ? range(1, length) : range(length, 1);
  const rotateAmount = randomNumber(1, length - 1);
  const partToMove = initialArray.slice(0, rotateAmount);
  const remainingPart = initialArray.slice(rotateAmount);
  return remainingPart.concat(partToMove);
}
