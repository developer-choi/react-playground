import type {FilterFormData} from '@util/services/product-filter/filter-form';
import type {CategoryFilter} from '@type/response-sub/filter-sub';
import type {NumericString} from '@type/string';

/**
 * 카테고리 필터만을 처리하는 별도의 모듈을 따로분리. (이 분리 방법이 애트니와 다르게 구현됨.)
 * 계층적인 필터이기때문.
 */

export function flatDeepCategoryList(categoryList: CategoryFilter[]): CategoryFilter[] {
  return categoryList.reduce((a, b) => {
    if (b.children) {
      return a.concat(b).concat(flatDeepCategoryList(b.children));
    }

    return a.concat(b);
  }, [] as CategoryFilter[]);
}

/**
 * 1. 기능: 자식 카테고리는 모두 삭제하고 부모 카테고리의 PK만 반환함.
 * 2. 목적: 현재 체크된 목록 보여줄 때, 필터 제출할 때 (= 현재 적용된 필터목록 보여줄 떄) 자식필터는 모두 삭제하기위함
 * TODO parameter type이 애트니와 다른데 이게 더 나은듯.
 */
export function removeCategoryChildren(categoryPkList: FilterFormData['category'], originalCategoryList: CategoryFilter[]): NumericString[] {
  const originalHaveChildrenCategoryList = flatDeepCategoryList(originalCategoryList).filter(({children}) => children.length > 0);

  const removeTargets = originalHaveChildrenCategoryList.reduce((a, b) => {
    if (b.children.every(original => categoryPkList.includes(String(original.pk) as NumericString))) {
      return a.concat(b.children);
    }

    return a;
  }, [] as CategoryFilter[]);

  return categoryPkList.filter(selectedPk => !removeTargets.find(target => target.pk === Number(selectedPk)));
}

/**
 * 1. 기능: 부모카테고리 PK가 존재하면 하위의 하위 카테고리의 모든 PK를 추가함.
 * 2. 목적: 쿼리스트링에 있는 카테고리PK를 폼데이터에 반영할 때, 하위 카테고리 PK를 모두 찾아서 복원하기위함.
 *
 * 위의 removeCategoryChildren()와 기능이 정반대임.
 * TODO 애트니와 로직 위치가 다름. onSubmit하는 Form에서 카테고리 필터 변환로직이 들어갔으니 여기 파일에 작성하는게 맞음.
 */
export function restoreCategoryChildren(parentCategoryPkList: number[], originalCategoryList: CategoryFilter[]): FilterFormData['category'] {
  //1. 체크됬던 부모들의 직계자식을 모아놓고,
  const directChildrenOfParent = flatDeepCategoryList(originalCategoryList)
    .filter(category => parentCategoryPkList.includes(category.pk))
    .map(({children}) => children ?? [])
    .flat();

  //2. 체크됬던 직계자식들의 자식의자식의자식들까지 모두 루프돌기위해 또 펼칩니다.
  const allChildrenOfCheckedParent = flatDeepCategoryList(directChildrenOfParent);
  const allCategoryPkList = allChildrenOfCheckedParent.map(({pk}) => pk);

  return parentCategoryPkList.concat(allCategoryPkList).map(value => String(value) as NumericString);
}
