/**
 * 특정 페이지로 들어가는 URL의 종류가 하나밖에 없는경우.
 */
export const JUST_ONE_URL = '/main';

/**
 * 1페이지 2페이지 3페이지같은 곳의 URL (query가 있을수도있고...)
 */
export interface ListPageUrlPreset {
  initial: string;
  page: (page: number) => string;
}

/**
 * 상품목록 페이지인데 노트북제품만 본다거나, 데스크탑제품만 본다거나 할 때.
 */
export interface FilteredPageUrlPreset {
  page: (query?: 'a' | 'b' | 'c') => string;
}
