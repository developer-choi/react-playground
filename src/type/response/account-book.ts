export interface AccountBookListResponse {
  list: AccountBookWithLargeCategory[];
  total: number;
}

export type LargeCategoryType = 'fixed' | 'saving' | 'living' | 'etc';

export type FixedCategoryType = 'insurance' | 'phone' | 'house' | 'transportation' | 'food' | 'hair' | 'allowance';
export type SavingCategoryType = 'deposit';
export type LivingCategoryType = 'our';
export type MiddleCategoryType = FixedCategoryType | SavingCategoryType | LivingCategoryType

export interface ParsedFullAccountBook {
  memo: string;
  largeCategory: LargeCategoryType;
  middleCategory: MiddleCategoryType;
  withdrawalPrice: number;
  depositPrice: number;
  date: string;
}

export interface AccountBook extends Omit<ParsedFullAccountBook, 'depositPrice' | 'withdrawalPrice'> {
  price: number;
  commaPrice: string;
}

export interface AccountBookWithLargeCategory {
  list: AccountBook[];
  largeCategoryName: string;
  total: number;
}
