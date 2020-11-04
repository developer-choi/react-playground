interface SearchType {
  type: string;
  value: string;
}

interface SortType {
  orderby: string;
  direction?: 'asc' | 'desc';
  type?: 'string' | 'number';
}

interface PagingListConfig {
  page: number;
  count: number;
  search?: SearchType;
  order?: SortType;
}

interface PaginationResult<T> {
  page: number;
  totalCount: number;
  list: T[];
}

/**
 * @param page 페이지번호.
 * @return 페이지번호가 유효한지 안한지 여부를 반환.
 * 페이지번호는 반드시 1 이상이고 정수여아합니다.
 */
export function isValidPageNumber(page: number) {
  return Number.isSafeInteger(page) && page >= 1;
}

/**
 * @return 페이지번호가 유효하지 않으면 기본 페이지번호인 1을 반환합니다.
 */
export function getPageNumber(page: number): number {
  return isValidPageNumber(page) ? page: 1;
}

/**
 * @return list안에 있는 요소중에,
 * (1) search의 type과 일치하는 요소의 property중에서
 * (2) search의 value가 존재하는 요소의 value를 배열로 반환합니다.
 * 결과가 없으면 빈배열 반환합니다.
 */
export function getSearchList<T extends Object>(list: T[], {type, value}: SearchType): T[] {

  return list.filter(item => {

    //@ts-ignore
    if (typeof item[type] !== 'string') {
      return false;

    } else {
      //@ts-ignore
      return item[type].includes(value);
    }
  });
}

/**
 * list에 들어있는 특정 요소 기준으로 정렬한 배열을 반환합니다.
 * 반드시 list의 모든 요소는 orderby값의 property를 가지고있어야 하고,
 * 넘겨받은 type으로 형변환이 반드시 가능해야합니다.
 */
export function getSortList<T extends Object>(list: T[], {direction = 'desc', orderby, type = 'string'}: SortType) {

  const clone = list;
  const isInvalid = !!clone.find(item => {

    //@ts-ignore
    if (type === 'number' && Number.isNaN(Number(item[orderby]))) {
      console.warn('리스트가 잘못되어 기번 배열로 반환됩니다. 숫자로 정렬하려면, 배열의 요소에 orderby로 전달된 property로 저장된 값이 숫자로 변환할 수 있어야 합니다.');
      return true;

      //@ts-ignore
    } else if (item[orderby] === undefined) {
      console.warn('리스트가 잘못되어 기번 배열로 반환됩니다. 배열의 모든 요소는, 정렬할 orderby의 property를 가지고있어야합니다.');
      return true;

    } else {
      return false;
    }

  });

  if (isInvalid) {
    return list;
  }

  if (type === 'number') {
    return direction === 'desc' ?
        //@ts-ignore
        clone.sort((a, b) => Number(b[orderby]) - Number(a[orderby]))
        :
        //@ts-ignore
        clone.sort((a, b) => Number(a[orderby]) - Number(b[orderby]))

  } else {
    return direction === 'desc' ?
        //@ts-ignore
        clone.sort((a, b) => b[orderby] === a[orderby] ? 0 : b[orderby] > a[orderby] ? 1 : -1)
        :
        //@ts-ignore
        clone.sort((a, b) => b[orderby] === a[orderby] ? 0 : b[orderby] > a[orderby] ? -1 : 1)
  }
}

/**
 * 요소가 존재하는 배열에 대해 특정 페이지에 해당하는 배열을 반환하는 함수입니다.
 * 서버에서 모든 글 목록을 받아서 페이징 처리할 때 사용하려고 만들었습니다.
 * 페이지 번호가 유효하지 않을경우, 페이지번호를 1번으로 처리합니다.
 */
export function getPagingList<T extends Object>(list: T[], {count, page}: PagingListConfig): PaginationResult<T>  {

  if (list.length === 0) {
    return {
      list: [],
      totalCount: 0,
      page: 1
    };
  }

  const _pageNumber = getPageNumber(page);
  const startIndex = (_pageNumber - 1) * count;
  const endIndex = startIndex + count;
  const toReturnList = list.slice(startIndex, endIndex);

  const totalCount = list.length;

  if (toReturnList.length === 0) {
    return {
      list: getPagingList(list, {count, page: 1}).list,
      page: 1,
      totalCount
    };
  } else {
    return {
      list: toReturnList,
      page: _pageNumber,
      totalCount
    };
  }
}
