import {urlStringify} from '../extend/query-string';

const MY_INFO_START_PATH = '/my-info';

function historyUrl({page = 1, query}: {page?: number | string, query?: {search: string}}) {
  return `${MY_INFO_START_PATH}/history/${page}${urlStringify(query)}`;
}

/**
 * URL은 slash를 기준으로 /path1/path2/path3 ==> object.path1.path2.path3으로 접근이 가능하도록 구분.
 * 사이트에 속한 웹페이지의 최상위 경로를 기준으로 파일을 분리하여 코드를 분리하기로 하였음.
 *
 * /board로 시작하는 페이지 있고,
 * /my-info로 시작하는 페이지 있고
 * /ranking로 시작하는 페이지가 있다면,
 *
 * board-url파일
 * my-info-url파일
 * ranking-url파일 총 3개로 만들어서 아래와같이 구현하여 export하는 방식으로.
 */
export const MY_INFO_URL = {
  /**
   * 모바일 하단 Navigation Bar에서 [아이콘링크, 아이콘링크, 아이콘링크]같은게 있는경우에서 active 스타일 줄 때 활용하기좋음.
   */
  activePath: MY_INFO_START_PATH,
  
  setting: {
    /**
     * URL이 항상 고정이고, query-string이나 /path1/[params] 같은 별도의 param이 없는경우.
     */
    changePassword: `${MY_INFO_START_PATH}/setting/change-password`
  },
  
  /**
   * 페이지를 가리키는 URL의 형태(?) 종류(?)가 2개 이상인 경우.
   * key 이름은 defaultPage, paramQuery 2개로 하기로했음.
   */
  history: {
    /**
     * [내역 페이지로 이동하는 링크]에 걸릴법한 기본 URL
     */
    defaultPage: historyUrl({page: 1}),
  
    /**
     * [2페이지] 또는 [검색어가 'xxx'인 1번 페이지]같은 URL
     */
    paramQuery: historyUrl
  },
  
  /**
   * xxx 사용자의 홈페이지 같은 경우를 예상하고 만들었고,
   * URL의 사용 예시는 위와달리 하나밖에 없어서 key-value를 2개씩 만들지않고 직접 함수를 할당했음.
   *
   * 누구누구 사용자의 홈을 가리키는 URL이라면 반드시 해당 사용자를 특정할 수 있는 PK값이 있어야하고,
   * 위처럼 없을 때 기본값으로 설정할 수 있는게 없기때문.
   *
   * parameter type은 반드시 객체형태로 잡았음. 추후 URL에 뭔가가 추가됬을 때 코드를 수정하기가 편해서.
   */
  friendHome: function ({id}: { id: number | string }) {
    return `${MY_INFO_START_PATH}/friend-home/${id}`;
  }
};
