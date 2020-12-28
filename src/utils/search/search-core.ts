import {parse, stringify} from 'query-string';

export type DirectionValue = 'asc' | 'desc'
export const DIRECTION_VALUES: DirectionValue[] = ['asc', 'desc'];

export interface SearchData<T extends string = string> {
  searchText: string;
  searchType: T;
}

export interface OrderbyData<O extends string = string> {
  orderby: O;
  directionValue: DirectionValue
}

// ?key=value에서 유효한 key만 모았음.
export type SearchValidKeys = keyof SearchData;
export type SortValidKeys = keyof OrderbyData;
export type AllValidSearchKeys = SearchValidKeys | SortValidKeys;

/** 상황설정 : 검색하면 내가 검색한 내용대로 주소창 URL이 바뀌는 경우에 한한 연구글. (네이버카페는 검색해도 url 안바뀜)
 *
 * 목적
 * 1. 주소창 querystring에 유효하지않은 key와 value가, 추후 서버로 전송되지 않도록 막는다.
 *
 * 조건(parse)
 * (1) 유효하지 않은 key가 있으면 삭제하고 parse
 * 예시) ?unknownKey=3
 *
 * (2) 유효하지않은 value가 있으면 삭제하고 parse
 * 브라우저 주소창에 ?page=1 또는 ?page=abc 이렇게 지원하는 key인데 원하지 않는 값이 들어있는 경우.
 * ?page= 이렇게 빈문자열인경우 혹은 배열인 경우.
 * ?direction=ascendant 혹은 ?direction=descendant 이렇게 querystring에서 유효한 값이 몇가지로 제한되는 경우에도
 *
 * (3) 같이 쓰이는 쿼리스트링 패러미터중 하나가 유효하지 않으면, 다른 나머지도 삭제해야함.
 * searchText가 빈문자열이면, searchText도 삭제하되 searchType도 같이 삭제해야함.
 */

export type SafeParseResult<K extends AllValidSearchKeys> = Partial<Record<K, string>>;
export type ParseValidator = (value: string) => boolean;

type StringifyValueType = string | boolean | number;
export type StringifyValidator<T extends StringifyValueType> = (value: T) => boolean;

type CommonParseValidatorKey = Extract<AllValidSearchKeys, 'searchText' | 'directionValue'>;
export const CommonParseValidator: Record<CommonParseValidatorKey, ParseValidator> = {
  searchText: text => text.length > 0,
  directionValue: value => DIRECTION_VALUES.includes(value as any)
};

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
     * 1. 유효하지않거나 (null)
     * 2. 배열이거나
     * 3. 넘겨받은 validator에 없으면 (= 유효하지 않은 키)
     * 반환 결과에 포함하지않는다.
     */
    if (Array.isArray(value) || !validator.hasOwnProperty(key) || !value) {
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

export function rootSafeStringify<K extends AllValidSearchKeys, V extends StringifyValueType>(object: Record<K, V>, validator: Record<K, StringifyValidator<V>>): string {
  const entries = Object.entries<V>(object);
  const safeObject = entries.reduce<Partial<Record<K, string | boolean | number>>>((a, [key, value]) => {

    if (!validator.hasOwnProperty(key)) {
      return a;
    }

    const _key = key as K;
    const func = validator[_key];

    if (value && func(value)) {
      a[_key] = value;
    }

    return a;
  }, {});
  return stringify(safeObject);
}
