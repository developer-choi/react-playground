/**
 * a년 b월 c일 d시 e분 f초 이런 날짜 객체를,
 * a년 b월 c일에 나머지는 전부 기본값인 날짜객체로 변환해서 반환함.
 */
function dateToDayDate(target: Date) {
  const {year, month, date} = dateToDetail(target);
  return new Date(year, month, date);
}

function dateToMonthDate(target: Date) {
  const {year, month} = dateToDetail(target);
  return new Date(year, month);
}

function canPreviousDay(target: Date, base: Date) {
  const targetToDayDate = dateToDayDate(target);
  const baseToDayDate = dateToDayDate(base);
  return targetToDayDate.getTime() > baseToDayDate.getTime();
}

function canNextDay(target: Date, limit: Date) {
  const targetToDayDate = dateToDayDate(target);
  const limitToDayDate = dateToDayDate(limit);
  return targetToDayDate.getTime() < limitToDayDate.getTime();
}

function canPreviousMonth(target: Date, base: Date) {
  const targetToMonthDate = dateToMonthDate(target);
  const baseToMonthDate = dateToMonthDate(base);
  return targetToMonthDate.getTime() > baseToMonthDate.getTime();
}

function canNextMonth(target: Date, limit: Date) {
  const targetToMonthDate = dateToMonthDate(target);
  const limitToMonthDate = dateToMonthDate(limit);
  return targetToMonthDate.getTime() < limitToMonthDate.getTime();
}

export function getDateMoveInfo(target: Date): DateMoveInfo {

  const {year, month, date} = dateToDetail(target);

  return {
    nextDay: new Date(year, month, date + 1),
    previousDay: new Date(year, month, date - 1),
    nextMonth: new Date(year, month + 1),
    previousMonth: new Date(year, month - 1)
  };
}

export interface DateMoveInfo {
  nextDay: Date;
  previousDay: Date;
  nextMonth: Date;
  previousMonth: Date;
}

export interface DateDetail {
  firstDate: Date; //해당 Date객체의 month달의 첫번 째 일의 Date객체. 9월이면 9월1일에 대한 Date객체.
  year: number;
  month: number; // 0이 1월
  date: number;
  day: number; // 0이 일요일
  lastDate: Date; //해당 Date객체의 month달의 마지막 일의 Date객체. 9월이면 9월30일에 대한 Date객체.
}

export function dateToDetail(targetDate = new Date()): DateDetail {
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

export function getCalendarDates(targetDate = new Date()): Date[] {

  const {year, month, lastDate, firstDate} = dateToDetail(targetDate);

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
