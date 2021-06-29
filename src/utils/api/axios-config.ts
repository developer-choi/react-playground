import {handleAuthError} from './auth';
import axios from 'axios';

export interface ParsedError {
  message: string;
  status?: number; //http status code or custom status code
}

const UN_EXPECTED_MESSAGE = '잠시후 다시 시도해주세요.';

/**
 * Case1. axios interceptor error(resolve, reject 2가지 케이스 모두)
 * 즉, API호출하다 발생한 에러는 어떠한 경우에도 반드시 ParsedError타입임.
 *
 * Case2. Client에서 발생한 에러객체는 반드시 Error타입.
 */
export function parseError(error: any): ParsedError {
  
  //Case2에 해당
  if (error instanceof Error) {
    return {
      message: UN_EXPECTED_MESSAGE
    };
  }
  
  return error as ParsedError;
}

/**
 * 에러처리 목적. 목표.
 *
 * 1. 사용자에게 에러코드에 맞는 피드백.
 * 2. 사용자에게 에러코드에 맞는 처리. (비번틀렸으면 비번입력창에 포커스 등)
 * 3. 개발자에게는 명확한 원인을 인지하도록.
 */
export function handleError(error: any) {
  const parsedError = parseError(error);
  handleParsedError(parsedError);
}

const MUST_LOGIN_ERROR_CODE = 700;
const SOME_JUST_ALERT_ERROR_CODE = 9999;
const SOME_MUST_LOGOUT_ERROR_CODE = 1234;

export function handleParsedError(error: ParsedError) {
  const {status, message} = error;
  
  switch (status) {
    case MUST_LOGIN_ERROR_CODE:
      handleAuthError(error);
      break;
    
    case SOME_MUST_LOGOUT_ERROR_CODE:
      console.log('logout process..');
      break;
    
    case SOME_JUST_ALERT_ERROR_CODE:
    default:
      alert(message);
  }
}

const axiosInstance = axios.create({
  baseURL: 'https://www.naver.com'
});

/**
 * error를 처리하는것은 axios와 매우 밀접한 관련이 있기 때문에, (interceptor처리에 맞춰서 parseError, handleError가 구성되게 되어있음)
 * 하나의 모듈안에 axios설정과 error처리 소스코드가 같이있는게 합리적임.
 */
axiosInstance.interceptors.response.use(response => {
  const {customStatus, customMessage} = response.data;
  
  if (customStatus === 200) {
    return response;
  }
  
  console.error(response);
  
  // API에서 HTTP Status를 사용하지않고 별도의 상태코드를 사용하는 경우에, 성공이 아니면 에러로직을 실행하기위함.
  return Promise.reject({status: customStatus, message: customMessage ?? UN_EXPECTED_MESSAGE});
}, error => {
  
  console.error(error);
  
  /**
   * 서버에서,
   * 잘못된 이유가 있으면, http status는 200에 custome error code와 custom error message로 응답하기로했기 때문에,
   * http status가 200이 아니면 예상하지못한 경우로 판단함.
   */
  return Promise.reject({status: error.response.status, message: UN_EXPECTED_MESSAGE});
});
