import type {ParsedUrlQuery} from 'querystring';
import { stringify } from 'querystring';

export type ParsedUrlQueryValue = ParsedUrlQuery['any-key'];

/**
 * @param value 쿼리스트링에 들어있던 값
 * @return value가 string이 아니면 undefined를 반환합니다. (= undefined이거나 array이면 undefined를 반환합니다)
 *
 * query string에 담을 수 있는 값의 타입은 undefined, string, string[] 총 3가지인데, 개발자가 허용하는 값의 타입은 string인 경우가 많았습니다.
 * 그러므로 개발자입장에서는 undefined도 string[]도 둘 다 유효하지 않은 값이기 때문에, 둘 다 걸러낼 필요성이 있었습니다.
 *
 * 또한, 빈문자열인 경우에도 유효하지 않은 값이라고 판단되어 똑같이 걸러낼 필요성이 있습니다.
 */
export function queryStringValueConvertString(value: ParsedUrlQueryValue): string | undefined {
  if (!value || Array.isArray(value)) {
    return undefined;
  } else {
    return value;
  }
}

/**
 * @return query객체가 비어있으면 빈문자열반환, 있으면 ?가 포함된 stringify하여 반환.
 */
export function urlStringify(query?: ParsedUrlQuery): string | '' {
  if (!query || Object.keys(query).length === 0) {
    return '';
  } else {
    return `?${stringify(query)}`;
  }
}
