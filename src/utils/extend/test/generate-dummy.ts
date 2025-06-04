import {randomNumber} from '@/utils/extend/test/random';

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
