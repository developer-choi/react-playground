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
