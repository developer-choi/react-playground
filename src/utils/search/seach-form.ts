import {groupKey, rootSafeStringify, SearchData} from './search-core';

export type UserSearchType = 'name';
export const UserSearchType: UserSearchType[] = ['name'];

export function userSearchSafeStringify(object: SearchData<UserSearchType>): string {

  const grouped = groupKey(object, [['searchText', 'searchType']]);
  return rootSafeStringify(grouped, {
    searchType: type => UserSearchType.includes(type as any),
    searchText
  });
}
