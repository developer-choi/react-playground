import {parse} from 'querystring';

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

//groupkeys
export const SEARCH_KEYS: (keyof SearchData)[] = ['searchType', 'searchText'];
export const ORDERBY_KEYS: (keyof OrderbyData)[] = ['orderby', 'direction'];
export const SEARCH_ORDERBY_GROUP_KEYS = [SEARCH_KEYS, ORDERBY_KEYS];

// ?key=value에서 유효한 key
export type SearchValidKeys = keyof SearchData;
export type SortValidKeys = keyof OrderbyData;
export type AllValidSearchKeys = SearchValidKeys | SortValidKeys;

/**
 * Validator types
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
