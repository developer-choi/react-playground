import {
  direction, getIncludesParseValidator,
  OrderbyData,
  rootSafeParse,
  SearchData,
  searchText
} from '@util/search/search-core';

export type UserSearchType = 'lastLogin' | 'signupDate' | 'email' | 'phone' | 'walletAddress';
export type UserOrderbyType = 'email' | 'phone' | 'signupDate' | 'lastLogin';
export type UserSearchOrderbyType = SearchData<UserSearchType> & OrderbyData<UserOrderbyType>;

const searchTypes: UserSearchType[] = ['phone', 'lastLogin', 'signupDate', 'email'];
const searchType = getIncludesParseValidator(searchTypes);

const OrderbyTypes: UserOrderbyType[] = ['email', 'signupDate', 'lastLogin', 'phone'];
const orderby = getIncludesParseValidator(OrderbyTypes);

export function userParse(search: string): Partial<UserSearchOrderbyType> {
  //validator를 통해 유효성검증을 맞췄으므로, type assertion
  return rootSafeParse(search, {
    searchText,
    direction,
    orderby,
    searchType
  }) as Partial<UserSearchOrderbyType>;
}
