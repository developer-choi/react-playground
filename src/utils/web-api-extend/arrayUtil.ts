/**
	* @param array 중복된 요소가 포함되어있는 배열
	* @return 중복된 요소가 제거된 배열
	*/
export function removeDuplicate(array: Array<any>) {
		return Array.from(new Set(array));
}