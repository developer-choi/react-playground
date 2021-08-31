import {randomNumber} from '../extend/random';

export function randomHexColor() {
  return '#' + new Array(6).fill('').map(() => randomNumber(1, 2 ** 4 - 1).toString(16)).join('');
}
