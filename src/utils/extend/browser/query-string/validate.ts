import type {ParsedUrlQuery} from 'querystring';
import {ValidateQueryOption, validateString, ValidationError} from '@forworkchoe/core/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

export type QueryValue = ParsedUrlQuery['any-key'];

/**
 * @example required false, throwable false ==> V | undefined
 * @example required false, throwable true ==> V | undefined (빈문자열일 경우 undefined가 반환됨)
 * @example required true, throwable false ==> V | undefined
 * @example required true, throwable true ==> V
 */
type ConditionalValueType<V, R extends boolean, T extends boolean> = (R | T) extends true ? V : V | undefined;

dayjs.extend(customParseFormat); // 이거 안하면 yyyy/mm/dd 이런식으로 형식 써도 통과되버리고, yyyy-m-dd 이런식으로 형식 써도 통과되버림;
dayjs.extend(isSameOrBefore);

export interface StringPeriod {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

/**
 * 시작일과 종료일 문자열을 검증하고,
 * 유효할 경우 Date 객체로 변환하여 반환합니다.
 *
 * 1. start / end가 yyyy-mm-dd 형식이 아닌 경우
 * 2. end가 start보다 과거인 경우
 * 3. end가 start와 같은 경우
 * 4. start와 end의 날짜 차이가 maxDifferenceDate 보다 큰 경우
 * ==>
 * 유효하지않은것으로 간주합니다.
 *
 * @param start - 시작일 문자열 (YYYY-MM-DD)
 * @param end - 종료일 문자열 (YYYY-MM-DD)
 * @param maxDifferenceDate - 최대 날짜 사이 간격, 이 값보다 크면 유효하지않다고 판단합니다.
 * @param options - ValidateQueryOption 참고
 * @returns 유효성 검증을 통과하면 {start: Date, end: Date} 객체를, 실패하면 undefined를 반환합니다.
 */
export function validatePeriod<R extends boolean = true, T extends boolean = true>(start: QueryValue, end: QueryValue, maxDifferenceDate: number, options?: ValidateQueryOption<R, T>): ConditionalValueType<StringPeriod, R, T> {
  const {throwable = true, required = true} = options ?? {};
  const errorOptions: ValidationError['options'] = {data: {start, end, maxDifferenceDate, options}};

  try {
    const _start = validateString(start, {throwable, required});
    const _end = validateString(end, {throwable, required});

    // validateString을 통과했으므로, result는 유효한 문자열이거나 (에러가 아닌) undefined 상태임.
    if (_start === undefined || _end === undefined) {
      return undefined as ConditionalValueType<StringPeriod, R, T>;
    }

    const startDay = dayjs(_start, 'YYYY-MM-DD', true);
    const endDay = dayjs(_end, 'YYYY-MM-DD', true);

    if (!startDay.isValid()) {
      throw new ValidationError(`start has a wrong format. ${start}`, errorOptions);
    }

    if (!endDay.isValid()) {
      throw new ValidationError(`end has a wrong format. ${end}`, errorOptions);
    }

    if (endDay.isSameOrBefore(startDay, 'day')) {
      throw new ValidationError('End date must be after the start date.', errorOptions);
    }

    const diffDays = endDay.diff(startDay, 'day');

    if (diffDays > maxDifferenceDate) {
      throw new ValidationError(`Period cannot be longer than ${maxDifferenceDate} days.`, errorOptions);
    }

    return {
      start: start as string,
      end: end as string,
    };
  } catch (error) {
    if (!throwable) {
      return undefined as ConditionalValueType<StringPeriod, R, T>;
    } else {
      throw error;
    }
  }
}
