import {numberPad} from '../number';

/**
 * Date 타입을 다른 타입으로 바꾸거나,
 * 다른 타입을 Date타입으로 바꾸는 함수가 있는 모듈입니다.
 */

export interface DestructedDate {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
  milliSecond: number;
}

export function destructDate(target = new Date()): DestructedDate {
  const year = target.getFullYear();
  const month = target.getMonth();
  const date = target.getDate();
  const hour = target.getHours();
  const minute = target.getMinutes();
  const second = target.getSeconds();
  const milliSecond = target.getMilliseconds();
  return { year, month, date, hour, minute, second, milliSecond };
}

/**
 * @param target 지정한 Date객체의 (기본값 : 함수가 호출된 현재에 대한 Date객체)
 * @return year, month, date, hour, minute, second, milliSecond 순서대로 저장된 배열을 반환합니다.
 * @example (new Date('2021-04-03 12:34:56')) => [2021, 4, 3, 12, 34, 56, 0]
 */
export function getDatePropertyArray(target = new Date()): [number, number, number, number, number, number, number] {
  const {year, month, date, hour, minute, second, milliSecond} = destructDate(target);
  return [year, month, date, hour, minute, second, milliSecond];
}

const YYYYMMDD_ERROR_MESSAGE = 'Parameter is not in yyyymmdd format.';

/**
 * @deprecated 근거는 pages/validate/query-string에 작성
 */
export function yyyymmddConvertDate(yyyymmdd: string | undefined) {
  if (yyyymmdd?.length !== 8) {
    throw Error(YYYYMMDD_ERROR_MESSAGE);
  }
  
  const year = yyyymmdd.slice(0, 4);
  const month = yyyymmdd.slice(4, 6);
  const date = yyyymmdd.slice(6, 8);
  
  if (Number.isNaN(Date.parse(`${year}-${month}-${date}`))) {
    throw Error(YYYYMMDD_ERROR_MESSAGE);
  }
  
  return new Date(Number(year), Number(month) - 1, Number(date));
}

/**
 * yyyymmdd ==> date로 변환하는 함수는 유효성검증을 하는 함수를 만들었지만,
 * 이 함수처럼 date ==> yyyymmdd로 변환하는 경우는, 유효성이 안맞을 수가 없기 떄문에 유효성검증 코드를 넣지않았음.
 * @deprecated 근거는 pages/validate/query-string에 작성
 */
export function dateConvertYyyymmdd(value = new Date()) {
  const {year, month, date} = destructDate(value);
  return `${year}${numberPad(month + 1, 2, '0')}${date}`;
}
