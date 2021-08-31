import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CustomApiError, UN_EXPECTED_MESSAGE } from '../utils/api/CustomApiError';

export default class BaseApi {
  protected readonly axios: AxiosInstance;
  
  constructor(basePath: string, config: AxiosRequestConfig = {}) {
    const { baseURL, ...rest } = config;
    
    this.axios = axios.create({
      baseURL: baseURL ? baseURL : `http://localhost:3000/${basePath}`,
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
