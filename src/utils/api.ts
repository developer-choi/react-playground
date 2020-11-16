import {BasicResponse, ResultCode} from '../response/common';
import {store} from '../store/store';
import {openUnexpectedModalActionCreator} from '../store/unexpected';
import I18n from 'i18n-js';
import {AxiosResponse} from 'axios';

export function dispatchOpenUnexpectedModal() {
  store.dispatch(openUnexpectedModalActionCreator(I18n.t('common2')));
}

export interface HandleErrorParameter {
  error: any;
  unexpected?: () => void;
  expected?: (errorCode: ResultCode) => void;
  expectedCodes?: ResultCode[];
}

/**
 * 타 회사에서는 이 함수 및 이 구현코드 자체가 필요없음 2xx자체가 성공응답이라는 뜻이 되기 때문에.
 */
export function isSuccessResponse(result?: ResultCode): boolean {
  return !! result?.startsWith('S');
}

/**
 * 타 회사에서는 이게 error.isAxiosError로 변경될 예정이라 아예 이 함수 자체가 필요가없어져버림. 그냥 if문안에 직접 넣으면 됨.
 */
function isApiError(error: any) {
  return !!error.data;
}

/**
 * 에러처리 목적은 크게 2가지.
 * (1) 사용자에게 경우에 맞는 피드백을 "반드시" 제공
 * (2) 그 경우가 만약 "개발자가 예상하지못함" 일 경우, 단서를 남기기 위해. 어떤 단서나면, 버그를 남기기 위한 단서.
 *
 * 그래서 이 2가지를 분기처리하되, 둘 다 각자 따로 사용할수도 있도록 철저히 분리.
 */
export function handleError({error, expected, expectedCodes = [], unexpected = dispatchOpenUnexpectedModal}: HandleErrorParameter) {

  if (!isApiError(error)) {
    handleFrontError({error, unexpected});
    return;
  }

  handleApiError({expected, unexpected, expectedCodes, error});
}

export function handleApiError({error, expected, expectedCodes = [], unexpected = dispatchOpenUnexpectedModal}: HandleErrorParameter) {
  const errorResponse = error as AxiosResponse<BasicResponse>;
  const resultCode = errorResponse.data.result;

  //all process ignore
  if (['ER009'].includes(resultCode)) {
    return;
  }

  if (expectedCodes?.includes(errorResponse.data.result)) {
    expected?.(resultCode);
    return;
  }

  unexpected();
  console.error('unexpected', error);
}

/**
 * FrontError는 무조건 내가 예상하지못한 경우밖에 없기 때문에, 다른 2개 패러미터는 Omit했고,
 * (1) 사용자에게는 반드시 unexpected() 처리결과만 보여주고
 * (2) 나는 에러종류별 로깅에만 집중하는걸로.
 *
 * 그런데, TypeError는 현재 hooks에서 componentDidCatch같은 API가 없어가지고....
 * 데이터받은걸로 렌더링할 때 TypeError발생하면 와 이건 모든 컴포넌트마다 try-catch로 잡아야하나? 아마.. 무슨컴포넌트에서 발생했는지를 꼬박 로그에 남기겠지?
 * 에러바운더리같은거를 배워야겠어..
 *
 * API Call로 시작해서 TypeError가 발생하는건 그냥 response 통째로 찍으면 되서 편하긴하지만
 * 다른회사에서는 API Call로 시작해서 TypeError가 발생할리가 없겠지. API명세를 얼마나 제대로하겠어,
 */
export function handleFrontError({error, unexpected = dispatchOpenUnexpectedModal}: Omit<HandleErrorParameter, 'expectedCodes' | 'expected'>) {
  console.error('Not Axios Error', error);
  unexpected();
}

const INVALID_ARRAY_ELEMENT = [undefined, null];

export function getDefaultApiList(list: any[]) {
  if (Array.isArray(list) && list.every(val => !INVALID_ARRAY_ELEMENT.includes(val))) {
    return list;

  } else {
    return [];
  }
}

export function getDefaultPagingList(response: AxiosResponse, list: any[]) {

  const totalCount = response.data.totalCount;
  const page = response.data.page;

  if (totalCount >= 1 && page >= 1) {
    return getDefaultApiList(list);

  } else {
    return [];
  }
}
