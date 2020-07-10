/**
 * @param min
 * @param max
 * @return min이상 max이하로 구성된 숫자배열을 반환합니다.
 * @example (1, 10) ==> 1~10사이 랜덤한 숫자 1개
 */
export function getMinMaxNumber(min: number, max: number): number {

    return parseInt(String(Math.random() * (max - min + 1))) + min;
}

/**
 * @param min 이상
 * @param max 이하
 * @return min부터 max까지 1단위로 숫자배열을 만들어서 반환합니다.
 * @example (1, 12) ==> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
export function getNumberArray(min: number, max: number): Array<number> {

    let result: Array<number> = [];

    for (let i = min; i < max + 1; i++)
        result.push(i);

    return result;
}

export function isOddNumber(number: number):boolean {
    return number % 2 === 1;
}

export function isEvenNumber(number: number):boolean {
    return number % 2 === 0;
}
