import {getNumberArray} from "../web-api-extend/numberUtil";

//1부터 9까지
export const NATURAL_NUMBERS: number[] = getNumberArray(1, 9);

//1부터 9까지
export const NATURAL_NUMBERS_STRING: string[] = NATURAL_NUMBERS.map(val => String(val));

//0부터 9까지
export const NUMBERS: number[] = [0].concat(NATURAL_NUMBERS);

//0부터 9까지
export const NUMBERS_STRING: string[] = ["0"].concat(NATURAL_NUMBERS_STRING);

//F1부터 F12까지
export const F_KEYS: string[] = getNumberArray(1, 12).map(val => `F${String(val)}`);

//방향키 4개
export const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

export const _FOR_SHORT_CUTS_KEYS = ["Shift", "Control", "Alt", "Home", "End", "PageUp", "PageDown"];
export const _FOR_INPUT_KEYS = ["Tab", "CapsLock", "Enter", "Backspace", "Insert", "Delete"];

//특수키
export const SPECIAL_KEYS = ["Escape", "NumLock", "ScrollLock", "Pause", "Meta", "ContextMenu"]
    .concat(ARROW_KEYS).concat(F_KEYS).concat(_FOR_INPUT_KEYS).concat(_FOR_SHORT_CUTS_KEYS);

//대문자 아스키코드값들
export const UPPER_CASE_LETTER_CODES: number[] = getNumberArray(65, 90);

//소문자 아스키코드값들
export const LOWER_CASE_LETTER_CODES: number[] = UPPER_CASE_LETTER_CODES.map(val => val + 32);

//대소문자 아스키코드값들
export const ALPHABET_CODES: number[] = UPPER_CASE_LETTER_CODES.concat(LOWER_CASE_LETTER_CODES);

//대문자
export const UPPER_CASE_LETTERS: string[] = UPPER_CASE_LETTER_CODES.map(val => String.fromCharCode(val));

//소문자
export const LOWER_CASE_LETTERS: string[] = UPPER_CASE_LETTERS.map(val => val.toLowerCase());

//대소문자
export const ALPHABET_LETTERS: string[] = LOWER_CASE_LETTERS.concat(UPPER_CASE_LETTERS);

//일반적으로 입력하는 특수문자들
export const GENERAL_SPECIAL_LETTERS: string[] = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]", "\\", "|", "-", "+", "/", ",", ".", "<", ">", "?",
        "\"", ":", ";", "_", "="];
