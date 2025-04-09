import {ParsedUrlQuery, stringify} from 'querystring';

// record의 value로 object만 없으면 됨.
export type ConvertableQuery = Record<string, string | string[] | boolean | number | number[] | null | undefined>;

export function cleanQuery(query: ConvertableQuery) {
  return Object.entries(query).reduce((a, [key, value]) => {
    if(!REMOVE_VALUE_ARRAY.includes(value as any)) {
      if (typeof value === 'number' || typeof value === 'boolean') {
        a[key] = value.toString();
      } else if (value === null) {
        a[key] = undefined;
      } else if (Array.isArray(value)) {
        a[key] = value.map(item => item.toString());
      } else {
        a[key] = value;
      }
    }

    return a;
  }, {} as ParsedUrlQuery);
}

export function stringifyQuery(query?: ConvertableQuery): '' | `?${string}` {
  const cleanedQuery = query ? cleanQuery(query) : {};

  if (Object.keys(cleanedQuery).length === 0) {
    return '';
  } else {
    return `?${stringify(cleanedQuery)}`;
  }
}

/**
 * @param originalUrl 링크에 지정한 URL /path?query=value 형식 (앞에 오리진 없어야함)
 * @param compareUrl 비교할 URL (현재 유저가 접속한 URL 등) /path?query=value 형식 (앞에 오리진 없어야함)
 * @description +와 공백을 서로 구분할 수 없음. 'pl+us'와 'pl us'를 비교하게 될 경우 같다고 반환됨.
 * 예제 케이스는, http://localhost:3000/markup/module/active-link/community 참고
 */
export function areUrlsIdentical(originalUrl: string, compareUrl: string): boolean {
  // 1. 일단 URL이 서로 같으면 true (쿼리스트링에 특수문자 없는경우)
  if (originalUrl === compareUrl) {
    return true;
  }

  const original = new URL(`https://domain.com${originalUrl}`);
  const compare = new URL(`https://domain.com${compareUrl}`);
  return decodeURIComponent(original.href).replaceAll('+', ' ') === decodeURIComponent(compare.href.replaceAll('+', ' '));
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const REMOVE_VALUE_ARRAY = [undefined, null, Number.NaN];