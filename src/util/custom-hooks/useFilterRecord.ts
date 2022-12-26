import type {Category} from '@type/response-sub/category-sub';
import {useCallback, useMemo, useState} from 'react';

export interface FilterRecordResult {
  filterRecord: FilterRecord;
  appendCategoryRecord: (categoryList: Category[]) => void;
}

export default function useFilterRecord(): FilterRecordResult {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const appendCategoryRecord = useCallback((categoryList: Category[]) => {
    setCategoryList(prevState => {
      const newCategoryList = categoryList.filter(({pk}) => !prevState.find(prev => prev.pk === pk));

      if (newCategoryList.length === 0) {
        return prevState;
      }

      return prevState.concat(newCategoryList);
    });
  }, []);

  const category: FilterRecord['category'] = useMemo(() => {
    return parseCategoryRecord(categoryList);
  }, [categoryList]);

  return {
    filterRecord: {
      category
    },
    appendCategoryRecord
  };
}

export type CategoryRecord = Record<number, Omit<Category, 'children'>>;

export interface FilterRecord {
  category: CategoryRecord;
}

function parseCategoryRecord(categoryList: Category[]): CategoryRecord {
  return categoryList.reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a[b.pk] = b;
    return a;
  }, {} as CategoryRecord);
}
