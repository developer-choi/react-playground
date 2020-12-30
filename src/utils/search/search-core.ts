import {parse, stringify} from 'query-string';

type DirectionValue = 'asc' | 'desc'
const DIRECTION_VALUES: DirectionValue[] = ['asc', 'desc'];

export interface SearchData<T extends string = string> {
  searchText: string;
  searchType: T;
}

export interface OrderbyData<O extends string = string> {
  orderby: O;
  directionValue: DirectionValue
}

// ?key=value에서 유효한 key
export type SearchValidKeys = keyof SearchData;
export type SortValidKeys = keyof OrderbyData;
export type AllValidSearchKeys = SearchValidKeys | SortValidKeys;

/**
 * Validator types
 */
export type SafeParseResult<K extends AllValidSearchKeys> = Partial<Record<K, string>>;
export type ParseValidator = (value: string) => boolean;

export type StringifyValueType = string | boolean | number;
export type StringifyValidator<T extends StringifyValueType> = (value: T) => boolean;

/**
 * Common validators
 */
export function searchText(value: StringifyValueType) {
  return typeof value === 'string' && value.length > 0;
}

export function directionValue(value: StringifyValueType) {
  return DIRECTION_VALUES.includes(value as any);
}


/**
 * Core functions
 */
export function groupKey<K extends string>(object: Partial<Record<K, any>>, groups: K[][]): Partial<Record<K, string>> {
  const keys = Object.keys(object);
  const remainKey = groups.filter(group => group.every(groupKey => keys.includes(groupKey))).reduce((a, b) => a.concat(b), []);
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

export function rootSafeStringify<K extends AllValidSearchKeys, V extends StringifyValueType>(object: Partial<Record<K, V>>, validator: Record<K, StringifyValidator<V>>): string {
  const keys = Object.keys(object);
  const safeObject = keys.reduce<Partial<Record<K, string | boolean | number>>>((a, key) => {

    if (!validator.hasOwnProperty(key)) {
      return a;
    }

    const _key = key as K;
    const value = object[_key];
    const func = validator[_key];

    if (value !== undefined && func(value as V)) {
      a[_key] = value;
    }

    return a;
  }, {});
  return stringify(safeObject);
}
