import moment from "moment";

export function momentFormat(format: string, timestamp?: number): string {
  if (timestamp) {
    return moment(timestamp).format(format);

  } else {
    return '-';
  }
}

export function dateFormatChartDay(timestamp?: number) {
  return momentFormat('MM/D', timestamp);
}

export function dateFormatDay(timestamp?: number) {
  return momentFormat('YYYY-MM-DD', timestamp);
}

export function dateFormatMinute(timestamp?: number) {
  return momentFormat('YYYY-MM-DD HH:mm', timestamp);
}
