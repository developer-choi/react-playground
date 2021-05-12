import {getDatePropertyArray} from './date-convert';

/**
 * @param target 기준날짜 (기본값은 현재)
 * @param diffs 기준일날짜기준 n(연, 월, 일, 시, 분, 초, 밀리초) 전/후 차이값배열
 * @return 기준일 기준 연 월 일 시 분 초 밀리초 차이만큼의 Date객체 반환
 * @example (new Date(), [2, 10, -10]) => 현재날짜 기준 +2년, +10월, -10일 기준 Date객체 반환
 */
export function getDiffDate(target = new Date(), diffs: number[] = []): Date {
  const targetDateProperties = getDatePropertyArray(target);
  const [year, month, date, hour, minute, second, mili] = diffs.reduce((a, b, index) => {
    a[index] += b;
    return a;
  }, targetDateProperties);
  return new Date(year, month, date, hour, minute, second, mili);
}
