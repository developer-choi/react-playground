import {NUMBERS_STRING} from '../random/character';
import {makeRandomString} from '../random/randomString';
import {getMinMaxNumber} from '../web-api-extend/numberUtil';

export type RGBType = [number, number, number];

export function toHexColor(colors: RGBType) {

  return `#${colors.map(dec => {

    const result = dec.toString(16);

    if (result.length < 2) {
      return `0${result}`;

    } else {
      return result;
    }

  }).join('')}`;
}

export function getRandomColor(): string {

  let hex: Array<string> = NUMBERS_STRING.concat('a', 'b', 'c', 'd', 'e', 'f');
  let randomColor = `#${makeRandomString(hex, 6)}`;
  return randomColor;
}

export function getGradationColor(colorCount = 2, deg = getMinMaxNumber(1, 180)) {

  const sumColor: string = new Array(colorCount).fill('').map(() => `${getRandomColor()}, `).join('');
  const resultColor = sumColor.slice(0, sumColor.length - 2);

  if (colorCount > 1)
    return `linear-gradient(${deg}deg, ${resultColor})`;

  else
    return `${resultColor}`;
}
