import {destructDate, getDatePropertyArray} from '@/utils/extend/date/convert';

export type DateConstructorNumbers = Parameters<DateConstructor>;
export type DateConstructorNumbersLength = 2 | 3 | 4 | 5 | 6 | 7;

/**
 * @param target 기준날짜 (기본값은 현재)
 * @param diffs 기준일날짜기준 n(연, 월, 일, 시, 분, 초, 밀리초) 전/후 차이값배열
 * @param datePropertyLength 반환될 Date객체에 적용할 target Date의 property 길이 (연, 월, 일, 시, 분, 초, 밀리초 순서대로)
 * @return 기준일 기준 연 월 일 시 분 초 밀리초 차이만큼의 Date객체 반환
 * @example (new Date(), [2, 10, -10], 3) => 현재날짜 기준 +2년, +10월, -10일 기준 Date객체 반환하는데 연, 월, 일 까지만 현재날짜를 따라가고 시 분 초 밀리초는 0으로 설정됨.
 */
export function getDiffDate(target: Date, diffs: number[], datePropertyLength?: DateConstructorNumbersLength): Date {
  const targetDateProperties = getDatePropertyArray(target);

  const _diffs = new Array(7).fill(0).map((_, index) => {
    if (index < diffs.length) {
      return diffs[index];
    } else {
      return 0;
    }
  });

  const dateProperties = _diffs.reduce((a, b, index) => {
    // eslint-disable-next-line no-param-reassign
    a[index] += b;
    return a;
  }, targetDateProperties);

  return new Date(...dateProperties.slice(0, datePropertyLength ?? _diffs.length) as DateConstructorNumbers);
}

/**
 * 특정날짜 기준 x주 전/후 y요일 구하기
 * day 1 = 월요일
 * day 2 = 화요일
 * day 6 = 토요일
 * day 0 = 일요일
 *
 * @example ("24년 5월 10일", 0, 0) ==> 해당 날짜 기준 그 주의 일요일
 * @example ("24년 5월 10일", -1, 1) ==> 해당 날짜 기준 그 전 주의 월요일
 * @example ("24년 5월 10일", 2, 1) ==> 해당 날짜 기준 그 다 다음주의 월요일
 */
export function getDiffDayInWeek(value: Date, diff: number, day: 1 | 2 | 3 | 4 | 5 | 6 | 0) {
  const {year, month, date, hour, minute, second, milliSecond} = destructDate(value);

  /**
   * 일단 먼저 월요일 기준 계산
   * 0이면 1더하고
   * 1이면 7더하고
   * 2이면 6더하고
   */
  const diffDate = value.getDay() === 0 ? 1 : 8 - value.getDay();

  /**
   * 구하고싶은 날짜가
   * 월요일이면 0 더하고
   * 화요일이면 1 더하고
   * ...
   * 일요일이면 6 더하고
   */
  const diffDays = day === 0 ? 6 : day - 1;

  const diffWeekDates = (diff - 1) * 7;
  return new Date(year, month, date + diffDate + diffWeekDates + diffDays, hour, minute, second, milliSecond);
}

//두 날짜간에 몇'일'차이나는지 계산, 시간은 무시
export function getDiffBetweenDate(a: Date, b: Date) {
  const [aYear, aMonth, aDate] = getDatePropertyArray(a);
  const [bYear, bMonth, bDate] = getDatePropertyArray(b);

  const aTimestamp = new Date(`${aYear}-${aMonth}-${aDate}`).getTime();
  const bTimestamp = new Date(`${bYear}-${bMonth}-${bDate}`).getTime();

  return (aTimestamp - bTimestamp) / 1000 / 3600 / 24;
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
