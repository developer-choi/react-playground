import type {ParsedUrlQuery} from 'querystring';
import {stringify} from 'querystring';
import {range} from '@util/extend/number';

export class ValidateError extends Error {
  constructor(message: string) {
    super(message);
  }
}

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
export function validateStringInQueryString<T extends string = string>(queryValue: QueryValue, conditions: T[] = []): T {
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

/**
 * @example 'abc' ==> throw ValidateError
 * @example ['a', 'b', 'c'] ==> throw ValidateError
 * @example '' ==> throw ValidateError
 * @example '0123' ==> throw ValidateError
 * @example '+123' ==> throw ValidateError
 * @example '-123' ==> throw ValidateError
 * @example '1234567890123456789012345678901234567890' ==> undefined (The value must be smaller than Number.MAX_SAFE_INTEGER)
 * @example '123' ==> '123'
 */
const NUMBERS = range(0, 9).map(value => value.toString());
const MAX_INTEGER_LENGTH = Number.MAX_SAFE_INTEGER.toString().length;

export function validateNumberInQueryString(queryValue: QueryValue): number {
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

export type ParsedQueryWithoutArray = { [key: string]: string | undefined };

/**
 * @return query객체가 비어있으면 빈문자열반환, 있으면 ?가 포함된 stringify하여 반환.
 */
export function urlStringify(query?: ParsedQueryWithoutArray): string | '' {
  if (!query || Object.keys(query).length === 0) {
    return '';
  } else {
    return `?${stringify(query)}`;
  }
}

/**
 * @example {someArray: ['1', '2', '3'], someValue: 'abc'} ==> {someValue: 'abc'}
 */
export function removeArrayInQuery(query: ParsedUrlQuery): ParsedQueryWithoutArray {

  const _query = Object.entries(query).filter(([, value]) => !Array.isArray(value)) as [string, string | undefined][];

  return _query.reduce((a, [key, value]) => {

    if (value) {
      // eslint-disable-next-line no-param-reassign
      a[key] = value;
    }

    return a;
  }, {} as {[key: string]: string});
}
