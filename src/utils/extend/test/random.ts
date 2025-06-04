import {popSpecificIndex} from '@/utils/extend/data-type/array';

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

export function randomBoolean(percent = 50): boolean {
  return Math.random() < percent / 100;
}

/**
 * 성공할 때 까지 전달된 횟수만큼 시도해서 성공여부를 반환
 */
export function tryRandomUntilSuccess(percent = 50, count: number): boolean {
  for (let i = 0; i < count; i++) {
    if (randomBoolean(percent)) {
      return true;
    }
  }

  return false;
}

/**
 * 전달된 확률로 성공하는데 몇회를 시도했는지 반환
 */
export function measureTriesToSuccess(percent = 50): number {
  let count = 0;

  while (true) {
    count++;

    if (randomBoolean(percent)) {
      return count;
    }
  }
}

export function randomInArray<T>(array: T[], count = 1): T[] {
  const temp = [...array];
  const maxCount = count < array.length ? count : array.length;

  const result: T[] = [];

  for(let i = 0; i < maxCount; i++) {
    const someIndex = randomIndex(temp);
    const item = temp[someIndex];
    temp.splice(someIndex, 1);
    result.push(item);
  }

  return result;
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

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function randomIndex(array: any[]): number {
  return randomNumber(0, array.length - 1);
}
