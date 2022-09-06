import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import env from '@util/env';

export default class BaseApi {
  readonly axios: AxiosInstance;

  constructor(basePath?: string, config: AxiosRequestConfig = {}) {
    const {baseURL, ...rest} = config;

    this.axios = axios.create({
      baseURL: baseURL ? baseURL : getDefaultBaseURL(basePath),
      ...rest
    });

    this.axios.interceptors.response.use(response => {
      const {customStatus} = response.data;

      if (customStatus === undefined || customStatus === 200) {
        return response;
      }

      console.error(response);
      return Promise.reject({response});
    });
  }
}

function getDefaultBaseURL(basePath = '') {
  const origin = env.public.origin;
  const path = `/api/${basePath}`.replace(/\/\//g, '/');
  return `${origin}${path}`;
}

export type AxiosErrorWithResponse = AxiosError & {response: AxiosResponse};

export function haveAxiosResponse(error: any): AxiosErrorWithResponse | undefined {
  if (!error.isAxiosError || !error.response) {
    return undefined;
  }

  return error;
}
