declare function isAfterDay(fromDate: number, toDate: number): boolean
declare function isAfterMonth(fromDate: number, toDate: number): boolean

declare function isBeforeDay(fromDate: number, toDate: number): boolean
declare function isBeforeMonth(fromDate: number, toDate: number): boolean

export interface DateDetail {
  firstDate: Date;
  year: number;
  month: number; // 0이 1월
  date: number;
  day: number; // 0이 일요일
  lastDate: Date;
}

export function getDateDetail(targetDate = new Date()): DateDetail {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth(); // 0이 1월
  const date = targetDate.getDate();
  const day = targetDate.getDay(); // 0이 일요일
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  return {
    year, month, date, day, lastDate, firstDate
  };
}

export function getWeekFirstDate(targetDate = new Date()): Date {
  const {year, month, date} = getDateDetail(targetDate);
  return new Date(year, month, date - targetDate.getDay());
}

export function getCalendarDates(targetDate = new Date()): Date[] {

  const {year, month, lastDate, firstDate} = getDateDetail(targetDate);

  const prevMonthDayCount = firstDate.getDay();

  const prevMonthInfos = new Array(prevMonthDayCount)
      .fill('').map((value, index) => new Date(year, month, index - prevMonthDayCount));

  const currentMonthInfos = new Array(lastDate.getDate())
      .fill('').map((value, index) => new Date(year, month, index + 1));

  const nextMonthDayCount = 7 - lastDate.getDay() - 1;

  const nextMonthInfos = new Array(nextMonthDayCount)
      .fill('').map((value, index) => new Date(year, month + 1, index + 1));

  return [...prevMonthInfos, ...currentMonthInfos, ...nextMonthInfos];
}

export function isSameMonth(date1: Date, date2: Date) {
  return date1.getMonth() === date2.getMonth();
}

export function isSameYearMonthDate(date1: Date, date2: Date) {
  return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
}
