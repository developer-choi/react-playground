import type {ParsedUrlQuery} from 'querystring';
import {ValidateError} from '@/utils/service/common/error/class';
import {range} from '@forworkchoe/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

export type QueryValue = ParsedUrlQuery['any-key'];

export interface ValidateQueryOption<R extends boolean, T extends boolean> {
  required?: R; // throwable이 true일 떄에 한해 의미가 있는 옵션입니다.
  throwable?: T; // 에러 던질지 그냥 undefined로 반환할지 여부
}

/**
 * @example required false, throwable false ==> V | undefined
 * @example required false, throwable true ==> V | undefined (빈문자열일 경우 undefined가 반환됨)
 * @example required true, throwable false ==> V | undefined
 * @example required true, throwable true ==> V
 */
type ConditionalValueType<V, R extends boolean, T extends boolean> = (R | T) extends true ? V : V | undefined;

/**
 * 쿼리 파라미터 값이 유효한 단일 문자열인지 검증합니다.
 * 정책: 빈 문자열('')은 값이 없는 것(undefined)으로 취급합니다.
 * @param queryValue - 검증할 쿼리 파라미터 값.
 * @param options - ValidateQueryOption 참고
 * @returns 검증을 통과한 문자열 또는 undefined. 옵션에 따라 에러를 던질 수 있습니다.
 * @throws {ValidateError} 배열이거나, required:true인데 값이 없을 경우.
 * Doc: https://docs.google.com/document/d/1QBD1sg1FGhnyw4_6HNwuvHWc8-TYlNoF2zFd4z7Pq_E/edit
 */
export function validateString<R extends boolean = true, T extends boolean = true>(queryValue: QueryValue, options?: ValidateQueryOption<R, T>): ConditionalValueType<string, R, T> {
  const {throwable = true, required = true} = options ?? {};

  try {
    if (required && !queryValue) {
      throw new ValidateError('The queryValue is not exist.');
    }

    if (Array.isArray(queryValue)) {
      throw new ValidateError('The queryValue is Array.');
    }

    // 빈문자열은 undefined랑 동일하게 처리되야함. 둘 다 유효하지않은 값이니까.
    if (queryValue === '') {
      return undefined as ConditionalValueType<string, R, T>;
    } else {
      return queryValue as string;
    }
  } catch (error) {
    if (!throwable) {
      return undefined as ConditionalValueType<string, R, T>;
    } else {
      throw error;
    }
  }
}

/**
 * 쿼리 파라미터 값이 주어진 목록(includeList)에 포함된 값인지 검증합니다.
 * @param queryValue - 검증할 쿼리 파라미터 값.
 * @param includeList - 허용되는 문자열의 목록.
 * @param options - ValidateQueryOption 참고
 * @returns 검증을 통과한 문자열(S 타입) 또는 undefined.
 * @throws {ValidateError} 허용 목록에 없는 값이거나, includeList가 비어있을 경우.
 */
export function validateIncludeString<S extends string, R extends boolean = true, T extends boolean = true>(queryValue: QueryValue, includeList: S[], options?: ValidateQueryOption<R, T>): ConditionalValueType<S, R, T> {
  const {throwable = true, required = true} = options ?? {};

  try {
    const result = validateString(queryValue, {throwable, required});

    // validateString을 통과했으므로, result는 유효한 문자열이거나 (에러가 아닌) undefined 상태임.
    if (result === undefined) {
      return undefined as ConditionalValueType<S, R, T>;
    }

    if (includeList.length === 0) {
      throw new ValidateError('The includeList is required.');
    }

    if (!includeList.includes(queryValue as any)) {
      throw new ValidateError('The queryValue is not in the conditions');
    }

    return queryValue as S;
  } catch (error) {
    if (!throwable) {
      return undefined as ConditionalValueType<S, R, T>;
    } else {
      throw error;
    }
  }
}

/**
 * 쿼리 파라미터 값이 계산 가능한 순수 양의 정수 형태의 문자열인지 검증합니다.
 * (허용: "123", 허용 안함: "+123", "-123", "0123", "1.23", "abc")
 * @param queryValue - 검증할 쿼리 파라미터 값.
 * @param options - ValidateQueryOption 참고
 * @returns 검증을 통과한 숫자 또는 undefined.
 * @throws {ValidateError} 숫자 형태가 아니거나, 자릿수가 너무 길 경우.
 */
export function validateComputableNumber<R extends boolean = true, T extends boolean = true>(queryValue: QueryValue, options?: ValidateQueryOption<R, T>): ConditionalValueType<number, R, T> {
  const {throwable = true, required = true} = options ?? {};

  try {
    const validatedString = validateString(queryValue, {throwable, required});

    // validateString을 통과했으므로, result는 유효한 문자열이거나 (에러가 아닌) undefined 상태임.
    if (validatedString === undefined) {
      return undefined as ConditionalValueType<number, R, T>;
    }

    if (validatedString.length > MAX_INTEGER_LENGTH) {
      throw new ValidateError('The queryValue is exceed maxLength.');
    }

    // 순수 숫자 외의 문자가 포함된 경우 (부호, 영문 등) ==> "+123", "-123"도 여기서 걸림.
    if (validatedString.split('').some(char => !NUMBERS.includes(char))) {
      throw new ValidateError('queryValue is not valid number');
    }

    // "0123" 처럼 0으로 시작하는 숫자도 허용하지않음, 0123은 숫자 123와 같은 뜻이긴 하지만, 문자열에서는 허용하지않음.
    if (validatedString.length > 1 && validatedString[0] === '0') {
      throw new ValidateError('queryValue is not valid number');
    }

    return Number(queryValue);
  } catch (error) {
    if (!throwable) {
      return undefined as ConditionalValueType<number, R, T>;
    } else {
      throw error;
    }
  }
}

const NUMBERS = range(0, 9).map(value => value.toString());
const MAX_INTEGER_LENGTH = Number.MAX_SAFE_INTEGER.toString().length;

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
      throw new ValidateError(`start has a wrong format. ${start}`);
    }

    if (!endDay.isValid()) {
      throw new ValidateError(`end has a wrong format. ${end}`);
    }

    if (endDay.isSameOrBefore(startDay, 'day')) {
      throw new ValidateError('End date must be after the start date.');
    }

    const diffDays = endDay.diff(startDay, 'day');

    if (diffDays > maxDifferenceDate) {
      throw new ValidateError(`Period cannot be longer than ${maxDifferenceDate} days.`);
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
