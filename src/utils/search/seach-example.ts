import {
  AllValidSearchKeys,
  directionValue,
  groupKey,
  rootSafeParse,
  rootSafeStringify,
  SafeParseResult,
  SearchData,
  searchText
} from './search-core';

//회원목록 검색조건 종류
export type UserSearchType = 'name';
export const UserSearchTypes = ['name'];

//회원목록 정렬조건 종류
export type UserOrderbyType = 'name';
export const UserSearchOrderby = ['name'];

export function userSearchSafeStringify(object: SearchData<UserSearchType>): string {

  const grouped = groupKey(object, [['searchText', 'searchType'], ['orderby', 'directionValue']]);
  return rootSafeStringify(grouped, {
    searchText,
    directionValue,
    searchType: type => UserSearchTypes.includes(type),
    orderby: text => UserSearchOrderby.includes(text)
  });
}

export function userSearchSafeParse(search: string): SafeParseResult<AllValidSearchKeys> {
  const parsed = rootSafeParse(search, {
    searchText,
    directionValue,
    searchType: text => UserSearchTypes.includes(text),
    orderby: text => UserSearchOrderby.includes(text)
  });
  return groupKey(parsed, [['searchText', 'searchType'], ['orderby', 'directionValue']]);
}
