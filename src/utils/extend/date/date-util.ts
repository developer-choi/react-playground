import {getDatePropertyArray} from './date-convert';

export type DateConstructNumbersType = Parameters<DateConstructor>;

/**
 * @param target 기준날짜 (기본값은 현재)
 * @param diffs 기준일날짜기준 n(연, 월, 일, 시, 분, 초, 밀리초) 전/후 차이값배열
 * @param datePropertyLength 반환될 Date객체에 적용할 target Date의 property 길이 (연, 월, 일, 시, 분, 초, 밀리초 순서대로)
 * @return 기준일 기준 연 월 일 시 분 초 밀리초 차이만큼의 Date객체 반환
 * @example (new Date(), [2, 10, -10], 3) => 현재날짜 기준 +2년, +10월, -10일 기준 Date객체 반환하는데 연, 월, 일 까지만 현재날짜를 따라가고 시 분 초 밀리초는 0으로 설정됨.
 */
export function getDiffDate(target: Date, diffs: number[], datePropertyLength: 2 | 3 | 4 | 5 | 6 | 7 = 3): Date {
  const targetDateProperties = getDatePropertyArray(target);
  const dateProperties = diffs.reduce((a, b, index) => {
    a[index] += b;
    return a;
  }, targetDateProperties);
  return new Date(...dateProperties.slice(datePropertyLength) as DateConstructNumbersType);
}
