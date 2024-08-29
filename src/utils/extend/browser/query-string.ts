import type {ParsedUrlQuery} from 'querystring';
import {ParsedUrlQueryInput, stringify} from 'querystring';
import {range} from 'lodash';
import {ValidateError} from '@/utils/extend/error/both-side';

export type QueryValue = ParsedUrlQuery['any-key'];

interface ValidateQueryOption<R extends boolean, T extends boolean> {
  required?: R;
  throwable?: T;
}

/**
 * @example required false, throwable false ==> V | undefined
 * @example required false, throwable true ==> V | undefined
 * @example required true, throwable false ==> V | undefined
 * @example required true, throwable true ==> V
 */
type ConditionalValueType<V, R extends boolean, T extends boolean> = (R | T) extends true ? V : V | undefined;

export function validateString<R extends boolean = true, T extends boolean = true>(queryValue: QueryValue, options?: ValidateQueryOption<R, T>): ConditionalValueType<string, R, T> {
  const {throwable = true, required = true} = options ?? {};
  let errorMessage = '';

  if (required && !queryValue) {
    errorMessage = 'The queryValue is not exist.';
  }

  if (!errorMessage && Array.isArray(queryValue)) {
    errorMessage = 'The queryValue is Array.';
  }

  if (!errorMessage) {
    return queryValue as string;
  }

  if (!throwable) {
    return undefined as ConditionalValueType<string, R, T>;
  }

  throw new ValidateError(errorMessage);
}

export function validateIncludeString<S extends string, R extends boolean = true, T extends boolean = true>(queryValue: QueryValue, includeList: S[], options?: ValidateQueryOption<R, T>): ConditionalValueType<S, R, T> {
  const {throwable = true, required = true} = options ?? {};
  let errorMessage = '';

  let result = validateString(queryValue, {throwable, required});

  //가능한 상태는, string 아니면 undefined. 만약 에러라면 이 라인 실행안되고 에러만 던져짐.
  if (result === undefined) {
    return undefined as ConditionalValueType<S, R, T>;
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
    return undefined as ConditionalValueType<S, R, T>;
  }

  throw new ValidateError(errorMessage);
}

//+123 -123 0123 셋다안되고 123가능.
export function validateNumber<R extends boolean = true, T extends boolean = true>(queryValue: QueryValue, options?: ValidateQueryOption<R, T>): ConditionalValueType<number, R, T> {
  const {throwable = true, required = true} = options ?? {};
  let errorMessage = '';

  let validatedString = validateString(queryValue, {throwable, required});

  //가능한 상태는, string 아니면 undefined. 만약 에러라면 이 라인 실행안되고 에러만 던져짐.
  if (validatedString === undefined) {
    return undefined as ConditionalValueType<number, R, T>;
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
    return undefined as ConditionalValueType<number, R, T>;
  }

  throw new ValidateError(errorMessage);
}

const NUMBERS = range(0, 9).map(value => value.toString());
const MAX_INTEGER_LENGTH = Number.MAX_SAFE_INTEGER.toString().length;

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

export function getTypedQueryCallback<K extends string, P extends string = string>() {
  return function (query: ParsedUrlQuery): Record<K | P, QueryValue> {
    return query as Record<K | P, QueryValue>;
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

/* validateString() Type Inference 체크용 주석
const canUndefined1 = validateString('', {required: false, throwable: false});
const canUndefined2 = validateString('', {required: false, throwable: true});
const canUndefined3 = validateString('', {required: true, throwable: false});

const mayString1 = validateString('', {required: true, throwable: true});
const mayString2 = validateString('');

console.log(mayString1, mayString2, canUndefined1, canUndefined2, canUndefined3);
*/

/* validateIncludeString() Type Inference 체크용 주석
type Fruit = 'apple' | 'banana';
const FRUITS: Fruit[] = ['apple', 'banana'];

const canUndefined1 = validateIncludeString('', FRUITS, {required: false, throwable: false});
const canUndefined2 = validateIncludeString('', FRUITS, {required: false, throwable: true});
const canUndefined3 = validateIncludeString('', FRUITS, {required: true, throwable: false});

const mayFruit1 = validateIncludeString('', FRUITS, {required: true, throwable: true});
const mayFruit2 = validateIncludeString('', FRUITS);

console.log(mayFruit1, mayFruit2, canUndefined1, canUndefined2, canUndefined3);
*/

/*
const canUndefined1 = validateNumber('',  {required: false, throwable: false});
const canUndefined2 = validateNumber('',  {required: false, throwable: true});
const canUndefined3 = validateNumber('',  {required: true, throwable: false});

const mayNumber1 = validateNumber('',  {required: true, throwable: true});
const mayNumber2 = validateNumber('');

console.log(mayNumber1, mayNumber2, canUndefined1, canUndefined2, canUndefined3);
*/

/**
 * https://stackoverflow.com/a/52539264/22674805
 * @param init URLSearchParams의 init parameter와 동일, 대체로 location.search값 그대로 전달하면됨.
 * @return 쿼리스트링을 객체로 변환하여 반환. 쿼리스트링이 비어있으면 빈객체로 반환
 * @example ('?fruit=apple&fruit=banana') ==> {fruit: ['apple', 'banana']}
 *
 * TODO 오히려 사용방법이 불편해진 단점이 있음. 개선필요.
 * 대다수의 경우 쿼리객체 전체가 필요하지않음.
 * new URLSearchParams(location.search).get('redirect_url') 이런 코드가 있다고 하면,
 * validateQueryString(convertQueryStringToObject().redirect_url, {required: false, throwable: false}); 이렇게 해야함.
 * 왜냐하면 URLSearchParams의 get, getAll은 동작이 서로 다르니까. get만 쓰는경우 첫 번째 배열요소만 쓰니까.
 * 하지만 이 함수는 string, string[], undefined 셋다 지원하다보니 결국 유효성검증도 다시 돌려야함.
 * 그럼 결과적으로 코드가 오히려 더 길어짐.
 *
 * 그래서 결국 convertQueryStringToObjectToString(init?: string, key: string) 뭐 이런식으로 (함수이름은 가칭) 만들어서 밸류값 하나만 반환하게 할텐데,
 * 그럼 호출하는곳 기준으로는 new URLSearchParams(location.search).get('...') 하는거랑 차이나는게 location.search 하나밖에 없어짐.
 * 그럼 결국 도찐개찐임.
 */
export function convertQueryStringToObject(init?: string): ParsedUrlQuery {
  const params = new URLSearchParams(init ?? location.search);

  return Array.from(params.entries()).reduce((acc, tuple) => {
    // getting the key and value from each tuple
    const [key, value] = tuple;

    if (acc.hasOwnProperty(key)) {
      // if the current key is already an array, we'll add the value to it
      if (Array.isArray(acc[key])) {
        // eslint-disable-next-line no-param-reassign
        acc[key] = [...acc[key] as string[], value];
      } else {
        // if it's not an array, but contains a value, we'll convert it into an array
        // and add the current value to it
        // eslint-disable-next-line no-param-reassign
        acc[key] = [acc[key] as string, value];
      }
    } else {
      // plain assignment if no special case is present
      // eslint-disable-next-line no-param-reassign
      acc[key] = value;
    }

    return acc;
  }, {} as ParsedUrlQuery);
}
