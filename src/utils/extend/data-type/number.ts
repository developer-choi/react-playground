/**
 * @example (1234.1234) => "1,234.1234"
 */
export function numberWithComma(value: number | string): string {
  const _value = typeof value === 'string' ? value : value.toString();
  const parts = _value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * @return from, to 사이의 자연수를 배열로 만들어 반환. from, to의 경계도 포함.
 * @example (-1, 4) => [-1, 0, 1, 2, 3, 4]
 * @example (4, -1) => [4, 3, 2, 1, 0, -1]
 */
export function range(from: number, to: number): number[] {
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  const length = max - min + 1;

  if (from > to)
    return [...new Array(length).keys()].map(num => num + min).reverse();

  else
    return [...new Array(length).keys()].map(num => num + min);
}

export function calculateTotal<T>(list: T[], callback: (item: T) => number) {
  return list.reduce((a, b) => {
    return a + callback(b);
  }, 0);
}

export function calculateNumberTotal(list: number[]) {
  return calculateTotal(list, value => value);
}
