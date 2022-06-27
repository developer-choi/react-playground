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

/**
 * value: 숫자값
 * 단위는 최대 2개를 반환함.
 *
 * (12345) ==> "1만 2345"
 * (1234) ==> "1234"
 * (123456789) ==> "1억 2345만"
 *
 * shortKorea1Unit()을 굳이 안만든이유는 그거는 밑에 shortKoreaFloat으로 대응이 되기 떄문.
 */
declare function shortKorea2Unit(value: number): string

/**
 *
 * @param decimalLength 소수점 길이 (default 0으로 할 생각)
 * (12345, 2) ==> 1.23만
 */
declare function shortKoreaFloat(value: number, decimalLength?: number): string

/**
 * (1234567, 2) ==> {short: 1.23, unit: 'M'}
 */
declare function shortSIUnit(value: number, decimalLength?: number): {
  short: number;
  unit: '' | 'K' | 'M' | 'G' | 'T'
}

/**
 * 대응이 안되는 케이스는,
 * 65,432 KW 이런식으로 기본단위를 K로 설정한다거나, 길이가 5자리 정도는 자르지않는 경우. (65.432M 안쓰고 저렇게)
 * 값이 0보다 한참 작을 때 표기할 방법이 음..
 */

export function numberPad(value: number, maxLength: number, character: string ) {
  return value.toString().padStart(maxLength, character);
}

export interface SignOfNumber {
  sign: 'positive' | 'negative' | '';
  mark: '+' | '-' | '';
  abs: number;
}

const EMPTY: SignOfNumber = {
  sign: '',
  mark: '',
  abs: 0
};

export function signOfNumber(value: number): SignOfNumber {
  const result = Math.sign(value);
  
  if (result === 0 || Number.isNaN(result)) {
    return EMPTY;
  }
  
  if (result > 0) {
    return {
      sign: 'positive',
      mark: '+',
      abs: value
    };
  } else {
    return {
      sign: 'negative',
      mark: '-',
      abs: Math.abs(value)
    };
  }
}

export function toFixedNumber(value: number, fractionDigits?: number) {
  return Number(value.toFixed(fractionDigits));
}