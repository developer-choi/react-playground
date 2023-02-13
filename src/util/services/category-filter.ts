import type {Category} from '@type/response-sub/category-sub';
import {useCallback, useMemo, useState} from 'react';

export type FilterType = 'category';

export interface FilterResult {
  pk: number;
  type: FilterType;
}

export function flatDeepCategoryList(categoryList: Category[]): Category[] {
  return categoryList.reduce((a, b) => {
    if (b.children) {
      return a.concat(b).concat(flatDeepCategoryList(b.children));
    }

    return a.concat(b);
  }, [] as Category[]);
}

export function removeCategoryChildren(selectedCategoryPkList: number[], originalCategoryList: Category[]): number[] {
  const originalHaveChildrenCategoryList = flatDeepCategoryList(originalCategoryList).filter(({children}) => children.length > 0);

  const removeTargets = originalHaveChildrenCategoryList.reduce((a, b) => {
    if (b.children.every(original => selectedCategoryPkList.includes(original.pk))) {
      return a.concat(b.children);
    }

    return a;
  }, [] as Category[]);

  return selectedCategoryPkList.filter(selectedPk => !removeTargets.find(target => target.pk === selectedPk));
}

export function categoryPkListToFilterResultList(categoryPkList: string[], originalCategoryList: Category[]): FilterResult[] {
  const numericPkList = categoryPkList.map(value => Number(value));

  //부모PK만 따로 남기기위해 모든 자식카테고리 삭제
  const result = removeCategoryChildren(numericPkList, originalCategoryList);

  return result.map(pk => ({
    pk,
    type: 'category'
  }));
}

export function parseFilterResultList(filterResultList: FilterResult[]): Record<FilterType, FilterResult[]> {
  return filterResultList.reduce((a, b) => {
      // eslint-disable-next-line no-param-reassign
      a[b.type] = a[b.type].concat(b);
      return a;
    }, {
      category: [],
    } as Record<FilterType, FilterResult[]>
  );
}

export interface FilterRecordResult {
  filterRecord: FilterRecord;
  appendCategoryRecord: (categoryList: Category[]) => void;
}

export function useFilterRecord(): FilterRecordResult {
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
