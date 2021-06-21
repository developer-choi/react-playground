/**
 * 생각보다 웹페이지의 주소는 자주바뀜.
 * 개발기간에는 빈번하게 바뀌고,
 * 개발이 끝나더라도 추후 기능이 추가되면서 주소가 또 바뀌는경우도 겪었음.
 * 그러므로 URL을 별도로 관리하여, 특정 페이지의 URL 바뀔 때 편하게 수정할 수 있도록 하기위해 이 모듈을 만들고있음.
 */

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
