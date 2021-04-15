import {dateToDetail} from './date';

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
