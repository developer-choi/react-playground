export interface Time {
  hour: number;
  minute: number;
  second: number;
}

export const MAX_MIN = 60 * 60 - 1;
export const MAX_SECOND = 60 - 1;

export const ZERO_TIME: Time = {
  hour: 0,
  minute: 0,
  second: 0
};

export function getTotalSecond(time: Time) {
  return time.hour * 60 * 60 + time.minute * 60 + time.second;
}

export function getTimeDiffSecond(time: Time, difference: number) {
  const totalSecond = getTotalSecond(time);
  return totalSecondToTime(totalSecond + difference);
}

export function totalSecondToTime(totalSecond: number): Time {

  if (totalSecond < 0) {
    return ZERO_TIME;
  }

  const hour = Math.floor(totalSecond / 60 / 60);
  const minute = Math.floor((totalSecond - hour * 60 * 60) / 60);
  const second = totalSecond - (hour * 60 * 60) - (minute * 60);

  return {
    hour, minute, second
  };
}
