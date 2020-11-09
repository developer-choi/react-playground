import {LOREM_IPSUM, LOREM_IPSUM_NOT_BLANK, randomFromArray} from './dummy-core';
import {randomNumber} from '../random';

export function randomLoremIpsum() {
  return randomFromArray([LOREM_IPSUM, LOREM_IPSUM_NOT_BLANK]);
}

export function randomCreateArray(list: any[], dummyLength = 100) {
  const listLength = list.length;
  return new Array(dummyLength).fill('').map(() => list[randomNumber(0, listLength - 1)]);
}

export function randomPhone(separator = '') {
  return `010${separator}${randomNumber(1000, 9999)}${separator}${randomNumber(1000, 9999)}`;
}

export function randomCountry() {
  return randomFromArray(['KR', 'JP', 'US']);
}
