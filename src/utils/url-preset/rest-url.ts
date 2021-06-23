import {urlStringify} from '../extend/query-string';

const STREAMING_START_PATH = '/streaming';

/**
 * 최상위 링크 바로 아래 페이지 역시 위 네이밍에 맞춰서 defaultPage로 명명.
 */
export const STREAMING_URL = {
  activePath: STREAMING_START_PATH,
  defaultPage: STREAMING_START_PATH, //아무리 최상위페이지라고 하더라도 key 이름을 index로 하지않고 네이밍 규칙에맞게 defaultPage로 명명
  id: function({ id }: { id: string | number }) {
    return `${STREAMING_START_PATH}/${id}`;
  }
};

const LIVESCORE_START_PATH = '/livescore';
type SportType = 'soccer' | 'baseball';

function livescoreListQuery(params?: {query?: {date: string, sportType: SportType}}) {
  return `${LIVESCORE_START_PATH}${urlStringify(params?.query)}`;
}

export const LIVESCORE_URL = {
  activePath: LIVESCORE_START_PATH,
  index: { //STREAMING_URL의 defaultPage key와 다르게 여기는 최상위 페이지인데 URL의 종류(?)가 2개라서 key를 index로 하되 그 밑에 defaultPage로 key이름을 지었음.
    listQuery: livescoreListQuery,
    defaultPage: livescoreListQuery(),
  },
  id: function({ id }: { id: string | number }) {
    return `${LIVESCORE_START_PATH}/${id}`;
  },
};
