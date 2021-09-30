import {getDatePropertyArray} from '@util/extend/date/date-convert';

export type DateConstructorNumbers = Parameters<DateConstructor>;
export type DateConstructorNumbersLength = 2 | 3 | 4 | 5 | 6 | 7;

/**
 * @param target 기준날짜 (기본값은 현재)
 * @param diffs 기준일날짜기준 n(연, 월, 일, 시, 분, 초, 밀리초) 전/후 차이값배열
 * @param datePropertyLength 반환될 Date객체에 적용할 target Date의 property 길이 (연, 월, 일, 시, 분, 초, 밀리초 순서대로)
 * @return 기준일 기준 연 월 일 시 분 초 밀리초 차이만큼의 Date객체 반환
 * @example (new Date(), [2, 10, -10], 3) => 현재날짜 기준 +2년, +10월, -10일 기준 Date객체 반환하는데 연, 월, 일 까지만 현재날짜를 따라가고 시 분 초 밀리초는 0으로 설정됨.
 */
export function getDiffDate(target: Date, diffs: number[], datePropertyLength: DateConstructorNumbersLength = 3): Date {
  const targetDateProperties = getDatePropertyArray(target);
  const dateProperties = diffs.reduce((a, b, index) => {
    a[index] += b;
    return a;
  }, targetDateProperties);
  return new Date(...dateProperties.slice(0, datePropertyLength) as DateConstructorNumbers);
}

/**
 * @param sliceIndex [연, 월, 일, 시, 분, 초, 밀리초] 순서대로, slice할 index
 * @param target 원하는 Date객체 (기본값은 현재에 대한 Date객체)
 * @example (3, new Date('2021-03-01 12:30:30')) => new Date(2021, 2, 1)
 *
 * 1. new Date()를 했는데 연 월 일 까지만 필요하고 나머지 시 분 초 밀리초를 버리고 싶을경우 사용
 * 2. 1번의 경우에서 현재가 아니라 다른 날짜인데 시 분 초 밀리초가 필요없어서 버릴경우 사용
 */
export function createDateWithSlice(sliceIndex: DateConstructorNumbersLength, target = new Date()) {
  const dateProperties = getDatePropertyArray(target);
  return new Date(...dateProperties.slice(sliceIndex) as DateConstructorNumbers);
}

/**
 * @param date1 비교할 Date1
 * @param date2 비교할 Date2
 * @param sameDepth 비교할 깊이 [연, 월, 일, 시, 분, 초, 밀리초] 순서로 몇개까지 일치해야 일치하다고 판단할 값
 */
export function isSameDate(date1: Date, date2: Date, sameDepth = 3): boolean {
  const date1Properties = getDatePropertyArray(date1).slice(0, sameDepth);
  const date2Properties = getDatePropertyArray(date2).slice(0, sameDepth);
  return date1Properties.every((value, index) => value === date2Properties[index]);
}
