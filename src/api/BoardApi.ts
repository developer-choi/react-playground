import BaseApi from './BaseApi';
import type { AxiosResponse } from 'axios';
import type { CustomApiError } from '../utils/api/CustomApiError';

export default class BoardApi extends BaseApi {
  constructor() {
    super('board');
  }
  
  api1(): Promise<AxiosResponse<{title: string}>> {
    return this.axios.get('some1');
  }
  
  api2(): Promise<AxiosResponse<CustomApiError>> {
    return this.axios.get('some2');
  }
  
  api3(): Promise<AxiosResponse<CustomApiError>> {
    return this.axios.get('some3');
  }
}
