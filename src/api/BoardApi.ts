import BaseApi, { CustomAxiosError } from './BaseApi';
import type { AxiosResponse } from 'axios';

export default class BoardApi extends BaseApi {
  constructor() {
    super('board');
  }
  
  // TODO 이 메소드들 ServerSide에서 사용할 떄는 전부 ServerSideError를 throw 하도록 수정해야해서 오히려 코드가 늘어남.
  api1(): Promise<AxiosResponse<{title: string}>> {
    return this.axios.get('some1');
  }
  
  api2(): Promise<AxiosResponse<CustomAxiosError>> {
    return this.axios.get('some2');
  }
  
  api3(): Promise<AxiosResponse<CustomAxiosError>> {
    return this.axios.get('some3');
  }
}
