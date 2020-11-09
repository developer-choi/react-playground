import {randomNumber} from '../random';

export const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
export const LOREM_IPSUM_NOT_BLANK = LOREM_IPSUM.replace(/ /g, '');

export function randomFromArray<T>(dummys: T[]): T {
  const randomIndex = randomNumber(0, dummys.length - 1);
  return dummys[randomIndex];
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
