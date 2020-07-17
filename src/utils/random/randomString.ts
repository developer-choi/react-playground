import {getMinMaxNumber} from "../web-api-extend/numberUtil";
import {
    ALPHABET_LETTERS,
    LOWER_CASE_LETTERS,
    NATURAL_NUMBERS_STRING,
    NUMBERS_STRING,
    UPPER_CASE_LETTERS
} from './character';

/**
 * @param anagramArray 랜덤한 문자열을 만들 때 들어갈 요소들
 * @param length 랜덤한 문자열의 길이
 *
 * @example (['a', 'b', 'c'], 5) ==> return 'aabac'
 */
export function makeRandomString(anagramArray: Array<string | number>, length: number): string {

    let result = new Array<string>(length);

    for (let i = 0; i < length; i++) {

        let randomIndex = getMinMaxNumber(0, anagramArray.length - 1);
        result.push(String(anagramArray[randomIndex]));
    }

    return result.join("");
}

/**
 * @param length return받을 문자열의 길이
 * @return 정수가 랜덤하게 섞인 문자열을 반환합니다.
 * @example (3) => "106"
 */
export function makeRandomNumbers(length: number): string {
    return makeRandomString(NUMBERS_STRING, length);
}

/**
 * @param length return받을 문자열의 길이
 * @return 자연수가 랜덤하게 섞인 문자열을 반환합니다.
 * @example (3) => "196"
 */
export function makeRandomNaturalNumbers(length: number): string {
    return makeRandomString(NATURAL_NUMBERS_STRING, length);

}

/**
 * @param length return받을 문자열의 길이
 * @return 대문자가 랜덤하게 섞인 문자열을 반환합니다.
 * @example (3) => "XDP"
 */
export function makeRandomUpperLetters(length: number): string {
    return makeRandomString(UPPER_CASE_LETTERS, length);
}

/**
 * @param length return받을 문자열의 길이
 * @return 소문자가 랜덤하게 섞인 문자열을 반환합니다.
 * @example (3) => "axy"
 */
export function makeRandomLowerLetters(length: number): string {
    return makeRandomString(LOWER_CASE_LETTERS, length);
}

/**
 * @param length return받을 문자열의 길이
 * @return n소문자, 대문자가 랜덤하게 섞인 문자열을 반환합니다.
 * @example (3) => "aBy"
 */
export function makeRandomAlphabets(length: number): string {
    return makeRandomString(ALPHABET_LETTERS, length);
}
