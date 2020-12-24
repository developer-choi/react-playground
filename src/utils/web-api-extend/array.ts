import {getNumberArray} from './number';
import {dateToDetail} from './date';

export function replace<T>(array: Array<T>, condition: (value: T, index: number, array: Array<T>) => boolean, replaceValue: T) {

  return array.map((value, index, original) => {
    if (condition(value, index, original)) {
      return replaceValue;

    } else {
      return value;
    }
  });
}

export function split<T>(array: T[], splitLength: number): T[][] {
  const arrayLength = array.length;
  const splitCount = (arrayLength === 0 || arrayLength % splitLength === 0) ? Math.floor(arrayLength / splitLength) : Math.floor(arrayLength / splitLength) + 1;
  return new Array(splitCount).fill('').map((value, index) => array.slice(index * splitLength, (index + 1) * splitLength));
}

export function divide<T>(array: T[], maxSize: number): T[] {

  const arrayLength = array.length;

  if (arrayLength <= maxSize) {
    return array;
  }

  const overCount = arrayLength - maxSize; //1이상
  const magic = arrayLength / (overCount + 1);
  const removeIndexes = getNumberArray(1, overCount).map(value => Math.floor(value * magic));

  return array.filter((value, index) => !removeIndexes.includes(index));
}

export function getPreviousOrFutureDate(target = new Date(), diff: number) {
  const {year, month, date} = dateToDetail(target);
  return new Date(year, month, date + diff);
}

export type Frequency = 'minute' | 'hour' | 'date' | 'month' | 'year';

/**
 * return되는 배열의 갯수 = lackLength와 동일
 */
export function getBetweenDatesByLackLength(lackLength: number, endDate: Date): Date[] {
  if (lackLength <= 0) {
    return [];
  }
  const startDate = getPreviousOrFutureDate(endDate, - (lackLength - 1));
  return getBetweenDates(startDate, endDate, 'date');
}

/**
 * 1. start가 end보다 나중인경우 : []
 * 2. start가 end랑 같은경우 : start 하나 (= end하나)
 * 3. 그 외 : [start, (사이), end]
 */
export function getBetweenDates(startDate: Date, endDate: Date, frequency: Frequency): Date[] {

  const diffDateLength = getDiffDateLength(startDate, endDate, frequency);

  if (diffDateLength < 0) {
    return [];
  }

  if (diffDateLength === 0) {
    return [startDate];
  }

  if (diffDateLength === 1) {
    return [startDate, endDate];
  }

  const {date, month, year, minute, hour} = dateToDetail(startDate);

  const betweenDates = getNumberArray(1, diffDateLength - 1).map(value => {

    switch (frequency) {
      case 'year':
        return new Date(year + value, 0);

      case 'month':
        return new Date(year, month + value);

      case 'date':
        return new Date(year, month, date + value);

      case 'hour':
        return new Date(year, month, date, hour + value);

      case 'minute':
        return new Date(year, month, date, hour, minute + value);

      default:
        throw Error(`invalid frequency ${frequency}`);
    }
  });

  return [startDate, ...betweenDates, endDate];
}

const MILLISECOND = 1000;
const SECOND = 60;
const MINUTE = 60;
const HOUR = 24;

export function timestampToMinute(timestamp: number): number {
  return timestamp / SECOND / MILLISECOND;
}

export function timestampToHour(timestamp: number): number {
  return timestampToMinute(timestamp) / MINUTE;
}

export function timestampToDate(timestamp: number): number {
  return timestampToHour(timestamp) / HOUR;
}

export function getDiffYear(startDate: Date, endDate: Date): number {
  return endDate.getFullYear() - startDate.getFullYear();
}

function getTotalMonth(date: Date) {
  return date.getFullYear() * 12 + date.getMonth();
}

export function getDiffMonth(startDate: Date, endDate: Date): number {
  return getTotalMonth(endDate) - getTotalMonth(startDate);
}

export function getDiffDate(startDate: Date, endDate: Date): number {
  const _startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const _endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  return timestampToDate(_endDate.getTime() - _startDate.getTime());
}

export function getDiffHour(startDate: Date, endDate: Date): number {
  const _startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours());
  const _endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours());
  return timestampToHour(_endDate.getTime() - _startDate.getTime());
}

export function getDiffMinute(startDate: Date, endDate: Date): number {
  const _startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
  const _endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes());
  return timestampToMinute(_endDate.getTime() - _startDate.getTime());
}

export function getDiffDateLength(startDate: Date, endDate: Date, frequency: Frequency): number {

  switch (frequency) {
    case 'year':
      return getDiffYear(startDate, endDate);

    case 'month':
      return getDiffMonth(startDate, endDate);

    case 'date':
      return getDiffDate(startDate, endDate);

    case 'hour':
      return getDiffHour(startDate, endDate);

    case 'minute':
      return getDiffMinute(startDate, endDate);
  }
}
