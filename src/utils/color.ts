import {makeRandomString, randomNumber} from './random';
import {getNumberArray} from './web-api-extend/number';

export interface GradientInfo {
  deg: number;
  colors: string[];
}

export function toLinearGradient({colors, deg}: GradientInfo) {

  if (deg) {
    return `linear-gradient(${deg}deg, ${colors.join(', ')})`;

  } else {
    return `linear-gradient(${colors.join(', ')})`;
  }
}

//0부터 9까지
export const NUMBERS = getNumberArray(0, 9).map(value => String(value));

export function getRandomColor(): string {

  let hex: Array<string> = NUMBERS.concat('a', 'b', 'c', 'd', 'e', 'f');
  return `#${makeRandomString(hex, 6)}`;
}

export function getRandomGradientInfo(colorCount = 2, deg = randomNumber(1, 180), baseColor = ''): GradientInfo {

  let colors = new Array(colorCount).fill('').map(() => getRandomColor());

  if (baseColor !== '') {
    const randomIndex = randomNumber(0, colorCount - 1);
    colors.splice(randomIndex, 1, baseColor);
  }

  return {
    colors, deg
  };
}
