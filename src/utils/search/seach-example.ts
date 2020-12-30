import {
  direction,
  getIncludesStringifyValidator,
  OrderbyData,
  rootSafeParse,
  rootSafeStringify,
  SearchData,
  searchText
} from './search-core';

export type UserSearchType = 'lastLogin' | 'signupDate' | 'email' | 'phone' | 'walletAddress';
export type UserOrderbyType = 'email' | 'phone' | 'signupDate' | 'lastLogin';
export type UserSearchOrderbyType = SearchData<UserSearchType> & OrderbyData<UserOrderbyType>;

const searchTypes: UserSearchType[] = ['phone', 'lastLogin', 'signupDate', 'email'];
const searchType = getIncludesStringifyValidator(searchTypes);

const OrderbyTypes: UserOrderbyType[] = ['email', 'signupDate', 'lastLogin', 'phone'];
const orderby = getIncludesStringifyValidator(OrderbyTypes);

const validators = {
  searchText,
  direction,
  orderby,
  searchType
};

export function userParse(search: string): UserSearchOrderbyType {
  //validator를 통해 유효성검증을 맞췄으므로, type assertion
  return rootSafeParse(search, validators) as UserSearchOrderbyType;
}

export function userStringify(searchOrderby: Partial<UserSearchOrderbyType>): string {
  return rootSafeStringify(searchOrderby, validators);
}
