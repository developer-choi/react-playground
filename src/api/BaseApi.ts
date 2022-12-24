import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import env from '@util/env';
import ConnectError from '@util/services/handle-error/ConnectError';

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

      return Promise.reject({response});

    }, error => {
      if(error.code === "ECONNREFUSED" && error.syscall === 'connect' && typeof error.address === 'string' && typeof error.port === 'number') {
        throw new ConnectError(error.address, error.port);
      }

      throw error;
    });
  }
}

function getDefaultBaseURL(basePath = '') {
  const origin = env.public.api;
  const path = basePath.replace(/\/\//g, '/');
  return `${origin}${path}`;
}

export type AxiosErrorWithResponse = AxiosError & {response: AxiosResponse};

export function haveAxiosResponse(error: any): AxiosErrorWithResponse | undefined {
  if (!error.isAxiosError) {
    return undefined;
  }

  return error;
}
