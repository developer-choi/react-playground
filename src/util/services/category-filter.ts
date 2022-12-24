import type {Category} from '@type/response-sub/category-sub';

export type FilterType = 'category';

export interface FilterResult {
  pk: number;
  type: FilterType;
}

export type CategoryRecord = Record<number, Category>;
export interface FilterRecord {
  category: CategoryRecord;
}

export function parseCategoryRecord(categories: Category[]): CategoryRecord {
  return categories.reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a[b.pk] = b;
    return a;
  }, {} as CategoryRecord);
}

export function flatCategories(categoreis: Category[]): Category[] {
  return categoreis.reduce((a, b) => {
    if (b.children) {
      return a.concat(b).concat(flatCategories(b.children));
    }

    return a.concat(b);
  }, [] as Category[]);
}

export function removeCategoryChildren(selectedCategoriesPk: number[], originalCategories: Category[]): number[] {
  const originalHaveChildrenCategories = flatCategories(originalCategories).filter(({children}) => children.length > 0);

  const removeTargets = originalHaveChildrenCategories.reduce((a, b) => {
    if (b.children.every(original => selectedCategoriesPk.includes(original.pk))) {
      return a.concat(b.children);
    }

    return a;
  }, [] as Category[]);

  return selectedCategoriesPk.filter(selectedPk => !removeTargets.find(target => target.pk === selectedPk));
}

export function categoryNamesToFilterResultList(selectedNames: string[], originalCategories: Category[]): FilterResult[] {
  const categoryPks = categoryConverter.namesToPks(selectedNames);

  //pk들만 모아서 서버로 보내고
  const result = removeCategoryChildren(categoryPks, originalCategories);

  //받아뒀던 카테고리로 뒤져서 이름 다시 맵핑
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

class FormNameConverter<T> {
  private readonly replacePrefix: string;
  private readonly pkExtractor: (value: T) => number;

  constructor(prefix: string, pkExtractor: (value: T) => number) {
    this.replacePrefix = prefix + '-';
    this.pkExtractor = pkExtractor;
  }

  itemToName(value: T) {
    const pk = this.pkExtractor(value);
    return this.pkToName(pk);
  }

  pkToName(pk: number) {
    return `${this.replacePrefix}${pk}`;
  }

  private nameToPk(name: string) {
    return Number(name.replace(`${this.replacePrefix}`, ''));
  }

  namesToPks(names: string[]): number[] {
    return names.map(name => this.nameToPk(name)).filter(pk => !Number.isNaN(pk));
  }
}

export const categoryConverter = new FormNameConverter('checked-list-category', (category: Category) => category.pk);
