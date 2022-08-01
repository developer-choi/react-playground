import type {ParsedUrlQuery} from 'querystring';
import {stringify} from 'querystring';

export type ParsedUrlQueryValue = ParsedUrlQuery['any-key'];

/**
 * @param queryValue Value in the Query String
 * @return Returns the value as it is when the value is validated. Returns undefined if not valid.
 *
 * @example 'abc' ==> undefined
 * @example ['a', 'b', 'c'] ==> undefined
 * @example '' ==> undefined
 */
export function validateValueInQueryString(queryValue: ParsedUrlQueryValue): string | undefined {
  if (!queryValue || Array.isArray(queryValue)) {
    return undefined;
  } else {
    return queryValue;
  }
}

const FAKE_NUMBER_VALUES = ['-', '+', '0'];

/**
 * @param queryValue Value in the Query String
 * @return Returns the value as it is when the value is validated. Returns undefined if not valid.
 *
 * @example 'abc' ==> undefined
 * @example ['a', 'b', 'c'] ==> undefined
 * @example '' ==> undefined
 * @example '0123' ==> undefined
 * @example '+123' ==> undefined
 * @example '-123' ==> undefined
 * @example '1234567890123456789012345678901234567890' ==> undefined (The value must be smaller than Number.MAX_SAFE_INTEGER)
 * @example '123' ==> '123'
 */
export function validateNumberInQueryString(queryValue: ParsedUrlQueryValue): string | undefined {
  const value = validateValueInQueryString(queryValue);
  
  if (!value) {
    return undefined;
  }
  
  const number = Number(value);
  
  if (Number.isNaN(number) || Number.MAX_SAFE_INTEGER <= number) {
    return undefined;
  }
  
  if (FAKE_NUMBER_VALUES.some(fake => value.startsWith(fake))) {
    return undefined;
  }
  
  return value;
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
