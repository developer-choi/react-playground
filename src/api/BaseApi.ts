import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CustomApiError, UN_EXPECTED_MESSAGE } from '../utils/api/CustomApiError';
import { getCurrentlyLoginUserInfo } from '../utils/auth/auth';

export default class BaseApi {
  protected readonly axios: AxiosInstance;
  
  constructor(basePath: string, config: AxiosRequestConfig = {}) {
    const { baseURL, headers, ...rest } = config;
    
    this.axios = axios.create({
      baseURL: baseURL ? baseURL : `http://localhost:3000/${basePath}`,
      // If this api created in CSR, set headers basically.
      headers: {...headers, ...getCurrentlyLoginUserInfo()},
      ...rest
    });
  
    this.axios.interceptors.response.use(response => {
      const {status, message} = response.data;
    
      if (status === 200) {
        return response;
      }
    
      console.error(response);
    
      return Promise.reject(new CustomApiError(message ?? UN_EXPECTED_MESSAGE, status));
    }, error => {
    
      console.error(error);
    
      return Promise.reject(new CustomApiError(UN_EXPECTED_MESSAGE, error.response.status));
    });
  }
}
