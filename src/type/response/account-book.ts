export interface AccountBookListResponse {
  list: AccountBookWithLargeCategory[];
  total: number;
}

export type LargeCategoryType = 'fixed' | 'saving' | 'living' | 'etc';

export interface ParsedFullAccountBook {
  memo: string;
  largeCategory: LargeCategoryType;
  withdrawalPrice: number;
  depositPrice: number;
  date: string;
}

export interface AccountBook extends Omit<ParsedFullAccountBook, 'depositPrice' | 'withdrawalPrice'> {
  price: number;
}

export interface AccountBookWithLargeCategory {
  list: AccountBook[];
  largeCategoryName: string;
  total: number;
}
