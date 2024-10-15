import type {ParsedUrlQuery} from 'querystring';
import {ValidateError} from '@/utils/service/error/both-side';
import {range} from '@/utils/extend/data-type/number';

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

// Doc: Doc: https://docs.google.com/document/d/1QBD1sg1FGhnyw4_6HNwuvHWc8-TYlNoF2zFd4z7Pq_E/edit
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
