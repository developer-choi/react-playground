import type {ParsedUrlQuery} from 'querystring';
import {useRouter} from 'next/router';
import type {GetServerSideProps} from 'next';
import {validateNumberInQueryThrowError, validateStringIncludes} from '@util/extend/browser/query-string';
import {COURSE_SORT} from '@util/services/course';
import {useKeepQuery} from '@util/extend/router';

/**
 * 장점: hooks, ssr 모두 query에 같은 키로 접근한 값을 얻어올 수 있음.
 * 한계1: 매번 모든 페이지마다 이걸 직접 박아야함. << 이건 어쩔수없어보임.
 * 한계2: 사실 패턴은 정형화되어있음. currentQuery, setQuery, 근데 getter와 setter간의 query key 일치를 하고싶음.
 */
function experimentalCourseQuery(query: ParsedUrlQuery) {
  return {
    page: query.page,
    topic: query.topic,
    room: query.room,
    sort: query.sort
  };
}

//그래서 이런걸 생각해봤으나 딱히 떠오르는게없음.
function getSetQuery<T>(query: ParsedUrlQuery, name: string) {
  return {
    getter: query[name],
    setter: (value: T) => {
    }
  };
}

/**
 * 그래서 이걸 만들고, 서비스마다 useSomeUI 만들듯이 서비스마다 클래스 하나씩 만들 생각도 잠깐했었고,
 * 아니면 getSetQuery() << 이부분만 하기위해 GetSetControl 이런식으로 클래스로 구현을 해볼까 싶기도 했었으나
 * 이 이상으로 생각이 진전되지않았음.
 */
class QueryControl {
  constructor(query: ParsedUrlQuery) {

  }
}

function useSomeUI() {
  const {query} = useRouter();
  const {replaceKeepQuery, getKeepQuery} = useKeepQuery();

  const queryResult = experimentalCourseQuery(query);
  const page = Number(queryResult.page);
  const topic = queryResult.topic as undefined | number;
  const room = queryResult.room as undefined | number;
  const sort = queryResult.sort as undefined | number;
}

const getServerSideProps: GetServerSideProps = async ({query}) => {
  const queryResult = experimentalCourseQuery(query);
  const page = validateNumberInQueryThrowError(queryResult.page);
  const topic = !queryResult.topic ? undefined : validateNumberInQueryThrowError(queryResult.topic);
  const room = !queryResult.room ? undefined : validateNumberInQueryThrowError(queryResult.room);
  const sort = validateStringIncludes(queryResult.sort, COURSE_SORT.typeList, false);

  return {
    props: {
    }
  };
};
