// TODO date 폴더 하위 함수들 다 dayjs로 변경하기

/**
 * Date 타입을 다른 타입으로 바꾸거나,
 * 다른 타입을 Date타입으로 바꾸는 함수가 있는 모듈입니다.
 */

export interface SimpleDate {
  year: number;
  month: number;
  date: number;
}

export interface DestructedDate extends SimpleDate {
  hour: number;
  minute: number;
  second: number;
  milliSecond: number;
}

// 주의 : month는 실제 month보다 1 작습니다. 0부터 시작하기 때문입니다.
export function destructDate(target = new Date()): DestructedDate {
  const year = target.getFullYear();
  const month = target.getMonth();
  const date = target.getDate();
  const hour = target.getHours();
  const minute = target.getMinutes();
  const second = target.getSeconds();
  const milliSecond = target.getMilliseconds();
  return {year, month, date, hour, minute, second, milliSecond};
}

/**
 * @param target 지정한 Date객체의 (기본값 : 함수가 호출된 현재에 대한 Date객체)
 * @return year, month, date, hour, minute, second, milliSecond 순서대로 저장된 배열을 반환합니다.
 * @example (new Date('2021-04-03 12:34:56')) => [2021, 3, 3, 12, 34, 56, 0]
 *
 * 주의 : month는 실제 month보다 1 작습니다. 0부터 시작하기 때문입니다.
 */
export function getDatePropertyArray(target = new Date()): [number, number, number, number, number, number, number] {
  const {year, month, date, hour, minute, second, milliSecond} = destructDate(target);
  return [year, month, date, hour, minute, second, milliSecond];
}
