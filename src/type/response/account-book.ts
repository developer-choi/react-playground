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
  price: number;
  memo?: string;
  largeCategory: LargeCategoryType;
  middleCategory: MiddleCategoryType;
}

interface FullAccountBook extends AccountBook{
  commaPrice: string;
}

export interface AccountBookWithLargeCategory {
  list: FullAccountBook[];
  largeCategoryName: string;
  total: number;
}
