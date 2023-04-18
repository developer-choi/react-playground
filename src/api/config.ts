import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import ConnectError from '@util/services/handle-error/ConnectError';
import env from '@util/env';

export function makeAxiosInstance(param?: AxiosRequestConfig | string): AxiosInstance {
  const config: AxiosRequestConfig = typeof param === 'string' ? {
    baseURL: getDefaultBaseURL(env.public.api, param)
  } : {
    ...param,
    baseURL: param?.baseURL ? param.baseURL : env.public.api
  };

  const instance = axios.create(config);

  instance.interceptors.response.use(response => {
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

  return instance;
}

function getDefaultBaseURL(origin: string, basePath = "") {
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
