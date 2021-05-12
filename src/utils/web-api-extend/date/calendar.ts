import {destructDate} from './date-convert';

export interface MonthDetail {
  firstDateOfTheMonth: Date; //해당 Date객체의 month달의 첫번 째 일의 Date객체. 9월이면 9월1일에 대한 Date객체.
  lastDateOfTheMonth: Date; //해당 Date객체의 month달의 마지막 일의 Date객체. 9월이면 9월30일에 대한 Date객체.
}

export function dateToMonthDetail(targetDate = new Date()): MonthDetail {
  const {year, month} = destructDate(targetDate);
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  
  return {
    lastDateOfTheMonth: lastDate, firstDateOfTheMonth: firstDate
  };
}

export function getCalendarDates(targetDate = new Date()): Date[] {
  
  const {year, month} = destructDate(targetDate);
  const {lastDateOfTheMonth, firstDateOfTheMonth} = dateToMonthDetail(targetDate);
  
  const prevMonthDayCount = firstDateOfTheMonth.getDay();
  
  const prevMonthDates = new Array(prevMonthDayCount)
      .fill('').map((value, index) => new Date(year, month, index - prevMonthDayCount));
  
  const currentMonthDates = new Array(lastDateOfTheMonth.getDate())
      .fill('').map((value, index) => new Date(year, month, index + 1));
  
  const nextMonthDayCount = 7 - lastDateOfTheMonth.getDay() - 1;
  
  const nextMonthDates = new Array(nextMonthDayCount)
      .fill('').map((value, index) => new Date(year, month + 1, index + 1));
  
  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
}
