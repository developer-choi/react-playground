export interface AccountBookListResponse {
  list: AccountBookWithLargeCategory[];
  total: number;
}

export type LargeCategoryType = 'fixed' | 'saving' | 'living' | 'etc';
export type FixedCategoryType = 'insurance' | 'phone' | 'house' | 'transportation' | 'food' | 'hair' | 'allowance';
export type SavingCategoryType = 'deposit';
export type LivingCategoryType = 'parent' | 'me';

export type MiddleCategoryType = FixedCategoryType | SavingCategoryType | LivingCategoryType

export interface AccountBook {
  memo: string;
  largeCategory: LargeCategoryType;
  middleCategory: MiddleCategoryType;
  price: number;
  commaPrice: string;
  date?: string;
}
export interface AccountBookWithLargeCategory {
  list: AccountBook[];
  largeCategoryName: string;
  total: number;
}
