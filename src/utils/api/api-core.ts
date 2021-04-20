import {AxiosResponse} from 'axios';
import {FrontError} from './FrontError';

export interface HandleFrontErrorConfig {
  error: any;
  unexpected?: () => void;
}

export function handleFrontError({error, unexpected}: HandleFrontErrorConfig) {
  
  if (error instanceof FrontError) {
    //error.message에 저장된 메시지로 에러팝업을 보여주는 등 에러처리 진행
  } else {
    unexpected?.();
  }
}

export type HttpStatusCode = number;
export interface SomeCommonResponse {

}

export interface HandleErrorParameter extends HandleFrontErrorConfig {
  expected?: (errorCode: HttpStatusCode) => void;
  expectedCodes?: HttpStatusCode[];
}

function isAxiosTimeoutError(error: any) {
  return error.code === 'ECONNABORTED';
}

export function handleApiError({error, expected, expectedCodes = [] as HttpStatusCode[], unexpected}: HandleErrorParameter) {
  
  if (isAxiosTimeoutError(error)) {
    alert('타임아웃 에러에 대한 에러메시지');
    return;
  }
  
  /**
   * 1. API가 HttpStatus로 에러응답을 하는경우, error는 AxiosError의 인스턴스라고 판단하고 에러데이터를 꺼내와서 어떤에러인지 판단.
   * 2. API가 Custom Status로 에러응답을 하는경우, (ex : response body에 에러코드를 넣는경우) 이 Custom Status가 어느 key에 담겨져 오는지 가지고 어떤 에러인지 판단.
   * (어떤 API는 result라는 키로 에러코드가 오고 어떤 API는 status라는 키로 에러코드가 오니까..)
   */
  const {status} = error as AxiosResponse<SomeCommonResponse>;

  if (expectedCodes?.includes(status)) {
    expected?.(status);
    return;
  }

  unexpected?.();
  console.error('unexpected', error);
}
