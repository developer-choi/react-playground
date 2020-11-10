/**
 * @example (0, 3) --> -2이상 3이하의 랜덤한 숫자 반환
 * @example (3, -2) --> -2이상 3이하의 랜덤한 숫자 반환
 */
import {LOREM_IPSUM, LOREM_IPSUM_NOT_BLANK} from './dummy/dummy-core';

export function randomNumber(from: number, to: number) {
  const _max = Math.max(from, to);
  const _min = Math.min(from, to);
  const length = Math.abs(_max - _min) + 1;
  return Math.floor(Math.random() * length) + _min;
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

  return result.join('');
}

export function getRandomComponentId() {
  return 'random-id-' + Math.floor(Math.random() * 10000000);
}

export function randomFromArray<T>(dummys: T[]): T {
  const randomIndex = randomNumber(0, dummys.length - 1);
  return dummys[randomIndex];
}

export function randomLoremIpsum() {
  return randomFromArray([LOREM_IPSUM, LOREM_IPSUM_NOT_BLANK]);
}

export function randomBigFloat() {
  return Math.random() * 100000000000000;
}

export function randomBigInteger() {
  return Math.floor(randomBigFloat());
}

export function randomSmallFloat(max = 100) {
  return Math.random() * max;
}

export function randomSmallInteger(max = 100) {
  return Math.floor(randomSmallFloat(max));
}

export function randomDummyList(list: any[], dummyLength = 100) {
  const listLength = list.length;
  return new Array(dummyLength).fill('').map(() => list[randomNumber(0, listLength - 1)]);
}
