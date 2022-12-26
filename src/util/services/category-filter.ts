import type {Category} from '@type/response-sub/category-sub';

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
