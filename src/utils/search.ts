import {parse} from 'query-string';

export type SearchValidKeys = 'searchText' | 'searchType';
export type SortValidKeys = 'directionType' | 'directionValue';
export type AllValidKeys = SearchValidKeys | SortValidKeys;

/** 상황설정 : 검색하면 내가 검색한 내용대로 주소창 URL이 바뀌는 경우에 한한 연구글. (네이버카페는 검색해도 url 안바뀜)
 *
 * *조건
 * 1. 주소창 querystring에 유효하지않은 key와 value가, 추후 서버로 전송되지 않도록 막는다.
 *
 * 구현
 * 1. wrappingParse() : 첫 페이지 로딩시 유효한 key, value만 파싱된 결과로 처리를 시작한다.
 * ==>
 * 2. wrappingStringify() : 이후 서버로 요청보낼 시, 유효한 value만 쿼리스트링에 담아서 보낸다.
 *
 * >> 모든 페이지에서 사용할 parse, stringify를 감싼 함수를 만들고, 여기서 타입체크 와 원하는 처리를 구현한다.
 * 1. 검색 타입이 페이지마다 모두 다르면, wrappingParse1 wrappingParse2 wrappingParse3을 여러개 만드는 방식으로 해결하되,
 * 타입체크만 해결하고 실제 처리는 root wrappingParse()로 해결한다.
 *
 * 예제
 * function wrappingParse<T>(params) {}
 *
 * function page1Parse(params) {
 *   return wrappingParse<SpecificType>(params);
 * }
 * >> 이후 page1 페이지에서는 page1Parse(params)로 아무런 Type Parameter를 넘기지않고 사용할 수 있지만 타입체크는 모두 받을 수 있다.
 *
 *
 * 1. 상세 구현목록 (parse)
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
 *
 * 2. 타입체크
 * 쿼리스트링에서 값을 받아와야 하는데 배열을 받아와야 하는 경우.
 *
 * 모든 코드에서,
 * const result = parse(location.search)하고
 * if(result.page !== undefined && typeof result.page !== 'array')를 하거나,
 *
 * const result = parse(location.search)하고
 * if(typeof result.arr === 'array')를 매번 할 수는 없음.
 *
 * array는 아예 깔끔하게 포기하고 파싱한 결과가 배열이면 걍 빼버리자.
 * 내가 예상했던게 아니니까.
 * 뺴버려야 타입체크에서 배열이 리턴타입이 아니라고 단정할 수 있다.
 * 일단 배열빼고 다되는 모듈을 만들자.
 */

/**
 * 1. location.search에서 validKeys에 해당하는 key의 value만 객체로 만들어서 반환함.
 * 2. 이 때 value가 빈문자열이면 유효하지않은 querystring인것으로 판단하고 해당 프로퍼티 삭제하고 반환함.
 */

export type SafeParseResult<K extends AllValidKeys> = Partial<Record<K, string>>;

export function rootSafeParse<K extends AllValidKeys>(search: string, validKeys: K[]): SafeParseResult<K> {
  const parsed = parse(search) as SafeParseResult<K>;
  return getValidPropertyAndValueObject(parsed, validKeys);
}

declare function rootSafeStringify<K extends AllValidKeys>(object: Record<K, string>): string
  // return stringify(object);

/**
 * 유효한 key만 따로 추려서 반환한다.
 * @example ({a: 1, page: 1}, ['page']) => {page: 1}
 */
type IsValidValueCallback = (value: string) => boolean;

function defaultValidValue(value: string) {
  return value !== '';
}

function getValidPropertyAndValueObject<K extends AllValidKeys>(object: SafeParseResult<K>, allowKeys: K[], validValueCallback: IsValidValueCallback = defaultValidValue): SafeParseResult<K> {

  const objectKeys = Object.keys(object);
  return objectKeys.reduce<SafeParseResult<K>>((a, b) => {

    //@ts-ignore
    if (!allowKeys.includes(b)) {
      return a;
    }

    const value = object[b as K] as string;

    if (!validValueCallback(value)) {
      return a;
    }

    a[b as K] = value;
    return a;

  }, {})
}

/**
 * directionValue에 가능한 값은 ascendant, descendant 2개인데,
 * 현재 타입체크를 받지못하고 아무런 타입에러가 나고있지 않음.
 */
// const directionType = '123';
// const directionValue = '1234';
// const res = rootSafeStringify({directionType, directionValue});
