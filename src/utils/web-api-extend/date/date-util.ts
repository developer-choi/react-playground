export interface DestructedDate {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
  milliSecond: number;
}

export function destructDate(target = new Date()): DestructedDate {
  const year = target.getFullYear();
  const month = target.getMonth();
  const date = target.getDate();
  const hour = target.getHours();
  const minute = target.getMinutes();
  const second = target.getSeconds();
  const milliSecond = target.getMilliseconds();
  return { year, month, date, hour, minute, second, milliSecond };
}

/**
 * @param target 지정한 Date객체의 (기본값 : 함수가 호출된 현재에 대한 Date객체)
 * @return year, month, date, hour, minute, second, milliSecond 순서대로 저장된 배열을 반환합니다.
 * @example (new Date('2021-04-03 12:34:56')) => [2021, 4, 3, 12, 34, 56, 0]
 * @example new Date(getOrderedDateProperty('2021-04-03 12:34:56').slice(0, 3)) => 2021-04-03에 대한 Date객체가 반환됩니다.
 */
export function getDatePropertyArray(target = new Date()): [number, number, number, number, number, number, number] {
  const {year, month, date, hour, minute, second, milliSecond} = destructDate(target);
  return [year, month, date, hour, minute, second, milliSecond];
}

/**
 * @example sliceIndex (2, new Date('2021-01-02 12:34:56')) => new Date('2021-01-01 00:00:00')
 * @example sliceIndex (3, new Date('2021-01-02 12:34:56')) => new Date('2021-01-02 00:00:00')
 * @example sliceIndex (4, new Date('2021-01-02 12:34:56')) => new Date('2021-01-02 12:00:00')
 * @example sliceIndex (5, new Date('2021-01-02 12:34:56')) => new Date('2021-01-02 12:34:00')
 * @example sliceIndex (6, new Date('2021-01-02 12:34:56')) => new Date('2021-01-02 12:34:56')
 */
export function getSlicedDate(sliceIndex: 2 | 3 | 4 | 5 | 6, target = new Date): Date {
  const dateProperties = getDatePropertyArray(target).slice(0, sliceIndex);
  return new Date(...dateProperties as [any]);
}

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
