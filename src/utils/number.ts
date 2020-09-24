/**
 * @example (1234.1234) => "1,234.1234"
 */
export function numberWithComma(value: number) {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

/**
 * @return from, to 사이의 자연수를 배열로 만들어 반환. from, to의 경계도 포함.
 * @example (-1, 4) => [-1, 0, 1, 2, 3, 4]
 * @example (4, -1) => [4, 3, 2, 1, 0, -1]
 */
export function getNumberArray(from :number, to: number): number[] {

    const max = Math.max(from, to);
    const min = Math.min(from, to);
    const length = max - min + 1;

    if(from > to)
        return [...new Array(length).keys()].map(num => num + min).reverse();

    else
        return [...new Array(length).keys()].map(num => num + min);
}

export function isOddNumber(number: number):boolean {
    return number % 2 === 1;
}

export function isEvenNumber(number: number):boolean {
    return number % 2 === 0;
}

const NUMBER_UNIT = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

export function defaultFormat(short: number, sign: number, unit: string) {
    return `${short * sign}${unit}`;
}

export function blankFormat(short: number, sign: number, unit: string) {
    return `${short * sign} ${unit}`;
}

export function numberWithSIUnit(value: number, format = defaultFormat): string {

    const sign = Math.sign(value);
    const abs = Math.abs(value);

    if (abs < 1) {
        throw Error('절댓값이 소수인 값은 지원하지 않습니다.');
    }

    const logValue = Math.log10(abs);
    const unit = NUMBER_UNIT[Math.floor(logValue / 3)];
    const short = Math.floor(abs / 10 ** (Math.floor(logValue / 3) * 3));
    return format(short, sign, unit);
}

export function numberIntegerDecimalSlice(value: number, maxNumberLength: number): number {

    const sign = Math.sign(value);
    const absValue = Math.abs(value);

    if (Number.isInteger(absValue)) {
        return Number(String(absValue).slice(0, maxNumberLength)) * sign;
    }

    const absValueToString = String(absValue);
    const integerPart = absValueToString.slice(0, absValueToString.indexOf('.'));
    const decimalPart = absValueToString.slice(absValueToString.indexOf('.') + 1, absValueToString.length);

    if (integerPart.length >= maxNumberLength) {
        return Number(integerPart.slice(0, maxNumberLength)) * sign;

    } else {
        const restLength = maxNumberLength - integerPart.length;
        return Number(`${integerPart.slice(0, maxNumberLength)}.${decimalPart.slice(0, restLength)}`) * sign;
    }
}
