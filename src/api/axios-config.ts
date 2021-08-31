import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosInstance.interceptors.response.use(response => {
  const {customStatus, customMessage} = response.data;
  
  if (customStatus === 200) {
    return response;
  }
  
  console.error(response);
  
  // API에서 HTTP Status를 사용하지않고 별도의 상태코드를 사용하는 경우에, 성공이 아니면 에러로직을 실행하기위함.
  return Promise.reject(new CustomApiError(customMessage ?? UN_EXPECTED_MESSAGE, customStatus));
}, error => {
  
  console.error(error);
  
  /**
   * 서버에서,
   * 잘못된 이유가 있으면, http status는 200에 custome error code와 custom error message로 응답하기로했기 때문에,
   * http status가 200이 아니면 예상하지못한 경우로 판단함.
   */
  return Promise.reject(new CustomApiError(UN_EXPECTED_MESSAGE ?? UN_EXPECTED_MESSAGE, error.response.status));
});

/**
 * API서버가 HTTP Status에 상태코드를 응답하지않고 (항상 200)
 * HTTP Response body에 status가 응답되는경우에 대비하기위해 구현되었고,
 *
 * API서버가 HTTP Status에 상태코드를 응답하도록 구현되어있을 경우 이것은 필요없음.
 * 그리고 이것만 지웠을 때에도 동일하게 모든 로직이 돌아가도록 구현해야함.
 */
export class CustomApiError extends Error {
  readonly status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const UN_EXPECTED_MESSAGE = '잠시후 다시 시도해주세요.';
