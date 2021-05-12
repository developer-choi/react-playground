import {ParsedUrlQuery} from 'querystring';
import {dateConvertYyyymmdd, dateConvertYyyymmddWithMoment, yyyymmddConvertDate} from './date/date-convert';

export type ParsedUrlQueryValue = ParsedUrlQuery['any-key'];

/**
 * @param value 쿼리스트링에 들어있던 값
 * @return value가 string이 아니면 undefined를 반환합니다. (= undefined이거나 array이면 undefined를 반환합니다)
 *
 * query string에 담을 수 있는 값의 타입은 undefined, string, string[] 총 3가지인데, 개발자가 허용하는 값의 타입은 string인 경우가 많았습니다.
 * 그러므로 개발자입장에서는 undefined도 string[]도 둘 다 유효하지 않은 값이기 때문에, 둘 다 걸러낼 필요성이 있었습니다.
 */
export function queryStringValueConvertString(value: ParsedUrlQueryValue): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  } else {
    return value;
  }
}

/**
 * @param value 쿼리스트링에 들어있던 date문자열 (형식 : yyyymmdd)
 * @return 입력값이 유효하면 그대로 반환, 유효하지 않으면 오늘 날짜를 yyyymmdd 형식으로 변환하여 반환
 */
export function getYyyymmddOrDefault(value: ParsedUrlQueryValue) {
  const defaultValue = dateConvertYyyymmdd(new Date());
  const _value = queryStringValueConvertString(value);
  
  try {
    return dateConvertYyyymmddWithMoment(yyyymmddConvertDate(_value));
  } catch (error) {
    return defaultValue;
  }
}
