import type {ParsedUrlQuery} from 'querystring';
import {ParsedUrlQueryInput, stringify} from 'querystring';
import {range} from '@util/extend/number';
import ValidateError from '@util/services/handle-error/ValidateError';
import type {Sort} from '@util/custom-hooks/useSort';
import {DIRECTIONS} from '@util/custom-hooks/useSort';

export type QueryValue = ParsedUrlQuery['any-key'];

/**
 * @example undefined => throw ValidateError
 * @example (['a', 'b', 'c']) => throw ValidateError
 * @example ('') => throw ValidateError
 * @example ('abc', ['apple', 'banana']) => throw ValidateError
 *
 * @example ('abc') => 'abc'
 * @example ('apple', ['apple', 'banana']) => 'apple'
 */
export function validateStringInQueryThrowError<T extends string = string>(queryValue: QueryValue, conditions: T[] = []): T {
  if (!queryValue || Array.isArray(queryValue)) {
    throw new ValidateError('queryValue is not valid string');
  }

  if (conditions.length === 0) {
    return queryValue as T;
  }

  if (!conditions.includes(queryValue as any)) {
    throw new ValidateError('queryValue is not in the conditions');
  }

  return queryValue as T;
}

export function isStringInQueryThrowError(queryValue: QueryValue) {
  if (typeof queryValue !== 'string') {
    throw new ValidateError('Value is not string');
  }

  return queryValue as string;
}

const NUMBERS = range(0, 9).map(value => value.toString());
const MAX_INTEGER_LENGTH = Number.MAX_SAFE_INTEGER.toString().length;

/**
 * @example '1ab' ==> throw ValidateError
 * @example ['a', 'b', 'c'] ==> throw ValidateError
 * @example '' ==> throw ValidateError
 * @example '0123' ==> throw ValidateError
 * @example '+123' ==> throw ValidateError
 * @example '1234567890123456789012345678901234567890' ==> throw ValidateError
 * @example '123' ==> 123
 */
export function validateNumberInQueryThrowError(queryValue: QueryValue): number {
  // undefined, empty string, array
  if (!queryValue || Array.isArray(queryValue) || queryValue.length > MAX_INTEGER_LENGTH) {
    throw new ValidateError('queryValue is not valid number');
  }

  const chars = queryValue.split('');

  // "+123", "-123"
  if (chars.some(char => !NUMBERS.includes(char))) {
    throw new ValidateError('queryValue is not valid number');
  }

  // "0123"
  if (chars[0] === '0') {
    throw new ValidateError('queryValue is not valid number');
  }

  return Number(queryValue);
}

/**
 * @return 정렬순서(order), 정렬기준(value)가 둘 다 존재하면 매개변수를 그대로 반환 Sort<T> (= 사용자가 정렬을 하려고 요청한 경우)
 * @return 정렬순서(order), 정렬기준(value)가 둘 다 존재하지 않으면 undefined를 반환 (= 사용자가 정렬을 하지 않으려고 요청한 경우)
 * @exception ValidateError 정렬순서(order), 정렬기준(value) 둘중 하나만 undefined인 경우 (= 정렬을 하려고하는지 안하려고하는지 알 수 없는 경우)
 */
export function validSortInQuery<T extends string>({orderbys, orderby, direction}: {orderby: QueryValue, direction: QueryValue, orderbys: T[]}): Partial<Sort<T>> {
  const _orderby = !orderby ? undefined : validateStringInQueryThrowError(orderby, orderbys);
  const _direction = !direction ? undefined : validateStringInQueryThrowError(direction, DIRECTIONS);

  if (direction === undefined && orderby === undefined) {
    return {
      orderby: undefined,
      direction: undefined
    };
  }

  if (direction !== undefined && orderby !== undefined) {
    return {
      orderby: _orderby,
      direction: _direction
    };
  }

  throw new ValidateError('value, order 둘중 하나만 undefined 입니다.');
}

const REMOVE_VALUE_ARRAY = [undefined, null, '', Number.NaN];

/**
 * 기존에 useRouter()의 push()의 첫번째 매개변수인 UrlObject에서 query객체를 전달할 때
 * {page: undefined} 이런 객체가 전달되면 실제 push되는 URL이 "/path?page=" 이렇게 query string value가 빈문자열로 나오는 상황이 있었습니다.
 * 이런일을 막기위해, 값이 빈문자열, null, undefined인 query-string은 아예 key-value쌍 자체를 삭제하기로 했습니다.
 *
 * @example {page: 1, order: null} ==> {page: 1}
 */
export function cleanQuery(query: ParsedUrlQueryInput) {
  return Object.entries(query).reduce((a, [key, value]) => {
    if(!REMOVE_VALUE_ARRAY.includes(value as any)) {
      // eslint-disable-next-line no-param-reassign
      a[key] = value;
    }

    return a;
  }, {} as Record<string, ParsedUrlQueryInput['any']>);
}

/**
 * @return query객체가 비어있으면 빈문자열반환, 있으면 ?가 포함된 stringify하여 반환.
 */
export function urlStringify(query?: ParsedUrlQuery): string {
  const cleanedQuery = query ? cleanQuery(query) : {};

  if (!cleanedQuery || Object.keys(cleanedQuery).length === 0) {
    return '';
  } else {
    return `?${stringify(cleanedQuery)}`;
  }
}
