import {getNumberArray} from "./numberUtil";

/**
 * @param array2d 정사각형 이차원배열
 * @return 정대각선 방향의 요소를 반환
 * @example ([[1, 2, 3], [4, 5, 6], [7, 8, 9]) ==> [1, 5, 9]
 */
export function forwardDiagonalArray(array2d: Array<Array<any>>): Array<any> {
    return array2d.map((array: Array<any>, rowIndex) => array[rowIndex]);
}

/**
 * @param array2d 정사각형 이차원배열
 * @return 역대각선 방향의 요소를 반환
 * @example ([[1, 2, 3], [4, 5, 6], [7, 8, 9]) ==> [3, 5, 7]
 */
export function backwordDiagonalArray(array2d: Array<Array<any>>): Array<any> {

    const standardLength = array2d[0].length;
    return array2d.map((array: Array<any>, rowIndex) => array[standardLength - rowIndex - 1]);
}

export function verticalArray(array2d: Array<Array<any>>, columnIndex: number) {
    return array2d.map(array => array[columnIndex]);
}

const successData1: Array<Array<number>> = [
    getNumberArray(1, 5),
    getNumberArray(6, 10),
    getNumberArray(11, 15),
    getNumberArray(16, 20),
    getNumberArray(21, 25),
];
const successData2: Array<Array<number>> = [
    getNumberArray(1, 5),
    getNumberArray(6, 10),
];
const successData3: Array<Array<number>> = [
    getNumberArray(1, 3),
    getNumberArray(6, 8),
    getNumberArray(11, 13),
    getNumberArray(16, 18),
    getNumberArray(21, 23),
];

const failData = [
    1, 2, 3
];

export function diagonalArrayTest() {
    console.log(forwardDiagonalArray(successData1));
    console.log(forwardDiagonalArray(successData2));
    console.log(forwardDiagonalArray(successData3));

    console.log(backwordDiagonalArray(successData1));
    console.log(backwordDiagonalArray(successData2));
    console.log(backwordDiagonalArray(successData3));
}

export function verticalArrayTest() {

    console.log(verticalArray(successData1, 1));
    console.log(verticalArray(successData2, 2));
    console.log(verticalArray(successData3, 4));
}
