/**
 * 1. location.search에서 validKeys에 해당하는 key의 value만 객체로 만들어서 반환함.
 * 2. 이 때 value가 빈문자열이면 유효하지않은 querystring인것으로 판단하고 해당 프로퍼티 삭제하고 반환함.
 */
declare function safeParse<T extends string>(search: string, validKeys: T[]): Partial<Record<T, string>>
