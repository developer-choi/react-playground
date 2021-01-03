import {parse, Stringifiable, stringify} from 'query-string';

export type DirectionValue = 'asc' | 'desc'
const DIRECTION_VALUES: DirectionValue[] = ['asc', 'desc'];

export interface SearchData<T extends string = string> {
  searchText: string;
  searchType: T;
}

export interface OrderbyData<O extends string = string> {
  orderby: O;
  direction: DirectionValue
}

// ?key=value에서 유효한 key
export type SearchValidKeys = keyof SearchData;
export type SortValidKeys = keyof OrderbyData;
export type AllValidSearchKeys = SearchValidKeys | SortValidKeys;

/**
 * Validator types
 */
/**
 * url에서 파싱한 결과의 value는 기본타입이 string이기 때문에, Value Type은 string 고정.
 * 그대신, 유효성검증 이후 자유롭게 Type Assertion으로 타입을 수정한다.
 */
export type SafeParseResult<K extends AllValidSearchKeys> = Partial<Record<K, string>>;
export type ParseValidator = (value: string) => boolean;

/**
 * Common validators
 */
export function searchText(value: string) {
  return value.length > 0;
}

export const direction = getIncludesParseValidator(DIRECTION_VALUES);

export function getIncludesParseValidator(array: any[]): ParseValidator {
  return function (value: string) {
    return array.includes(value);
  };
}

/**
 * Core functions
 */
export function groupKey<O extends { [key: string]: any }>(object: O, groups: (keyof O)[][]): O {
  const keys = Object.keys(object);

  /**
   * group으로 묶인 key가 빠짐없이 있어야 하고,
   * 해당 key에 해당하는 value가 유효해야함.
   */
  const remainKey = groups
  .filter(group => group.every(groupKey => keys.includes(groupKey as string) && !!object[groupKey]))
  .reduce((a, b) => a.concat(b), []);

  return Object.entries(object).reduce((a: any, [key, value]) => {
    if (remainKey.includes(key as any)) {
      a[key] = value;
    }
    return a;
  }, {});
}

export function rootSafeParse<K extends AllValidSearchKeys>(search: string, validator: Record<K, ParseValidator>): SafeParseResult<K> {
  const entries = Object.entries(parse(search));
  return entries.reduce<SafeParseResult<K>>((a, [key, value]) => {

    /**
     * search를 parse한 결과가
     * 1st. 유효하지않거나 (null)
     * 2nd. 넘겨받은 validator에 없으면 (= 유효하지 않은 키)
     * 3rd. 배열이면
     * 반환 결과에 포함하지않는다.
     */
    if (!value || !validator.hasOwnProperty(key) || Array.isArray(value)) {
      return a;
    }

    const _key = key as K;
    const func = validator[_key];

    if (value && func(value)) {
      a[_key] = value;
    }

    return a;

  }, {});
}

export function stringifyWithoutUndefined(obj: { [key: string]: Stringifiable }): string {
  return stringify(Object.entries(obj).reduce<{ [key: string]: Stringifiable }>((a, [key, value]) => {

    if (value !== undefined) {
      a[key] = value;
    }

    return a;
  }, {}));
}
