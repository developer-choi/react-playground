import type {ParsedUrlQuery} from 'querystring';
import {ParsedUrlQueryInput, stringify} from 'querystring';
import {range} from '@util/extend/data-type/number';
import ValidateError from '@util/services/handle-error/ValidateError';

export type QueryValue = ParsedUrlQuery['any-key'];

export function validateString<B extends boolean = true>(queryValue: QueryValue, options?: ValidateQueryOption<B>): ConditionalValueType<string, B> {
  const {throwable = true, required = true} = options ?? {};
  let errorMessage = '';

  if (required && !queryValue) {
    errorMessage = 'The queryValue is not exist';
  }

  if (!errorMessage && Array.isArray(queryValue)) {
    errorMessage = 'The queryValue is Array.';
  }

  if (!errorMessage) {
    return queryValue as string;
  }

  if (!throwable) {
    return undefined as ConditionalValueType<string, B>;
  }

  throw new ValidateError(errorMessage);
}

export function validateIncludeString<S extends string, B extends boolean = true>(queryValue: QueryValue, includeList: S[], options?: ValidateQueryOption<B>): ConditionalValueType<S, B> {
  const {throwable = true, required = true} = options ?? {};
  let errorMessage = '';

  let result = validateString(queryValue, {throwable, required});

  //가능한 상태는, string 아니면 undefined. 만약 에러라면 이 라인 실행안되고 에러만 던져짐.
  if (result === undefined) {
    return undefined as ConditionalValueType<S, B>;
  }

  if (includeList.length === 0) {
    errorMessage = 'The includeList is required.';
  }

  if (!includeList.includes(queryValue as any)) {
    errorMessage = 'The queryValue is not in the conditions';
  }

  if (!errorMessage) {
    return queryValue as S;
  }

  if (!throwable) {
    return undefined as ConditionalValueType<S, B>;
  }

  throw new ValidateError(errorMessage);
}

//+123 -123 0123 셋다안되고 123가능.
export function validateNumber<B extends boolean = true>(queryValue: QueryValue, options?: ValidateQueryOption<B>): ConditionalValueType<number, B> {
  const {throwable = true, required = true} = options ?? {};
  let errorMessage = '';

  let validatedString = validateString(queryValue, {throwable, required});

  //가능한 상태는, string 아니면 undefined. 만약 에러라면 이 라인 실행안되고 에러만 던져짐.
  if (validatedString === undefined) {
    return undefined as ConditionalValueType<number, B>;
  }

  if (validatedString.length > MAX_INTEGER_LENGTH) {
    errorMessage = 'The queryValue is exceed maxLength.';
  }

  const chars = validatedString.split('');

  // "+123", "-123", "a123"
  if (chars.some(char => !NUMBERS.includes(char))) {
    errorMessage = 'queryValue is not valid number';
  }

  // "0123"
  if (chars[0] === '0') {
    errorMessage = 'queryValue is not valid number';
  }

  if (!errorMessage) {
    return Number(queryValue);
  }

  if (!throwable) {
    return undefined as ConditionalValueType<number, B>;
  }

  throw new ValidateError(errorMessage);
}

const NUMBERS = range(0, 9).map(value => value.toString());
const MAX_INTEGER_LENGTH = Number.MAX_SAFE_INTEGER.toString().length;

type ConditionalValueType<V, B extends boolean> = B extends true ? V : V | undefined;

interface ValidateQueryOption<B extends boolean> {
  required?: boolean;
  throwable?: B;
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

export function getTypedQueryCallback<K extends string>() {
  return function (query: ParsedUrlQuery): Record<K, QueryValue> {
    return query as Record<K, QueryValue>;
  };
}

/**
 * @return query객체가 비어있으면 빈문자열반환, 있으면 ?가 포함된 stringify하여 반환.
 */
export function urlStringify(query?: ParsedUrlQueryInput): string {
  const cleanedQuery = query ? cleanQuery(query) : {};

  if (!cleanedQuery || Object.keys(cleanedQuery).length === 0) {
    return '';
  } else {
    return `?${stringify(cleanedQuery)}`;
  }
}
