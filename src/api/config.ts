import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import ConnectError from '@util/services/handle-error/ConnectError';
import env from '@util/env';
import type {GetServerSidePropsContext} from "next";

export interface MakeAxiosInstanceParam {
  baseURL?: string
  config?: AxiosRequestConfig
  context?: GetServerSidePropsContext
}

export function makeAxiosInstance(param?: MakeAxiosInstanceParam): AxiosInstance {
  const {config, baseURL} = param ?? {}
  const _baseURL = config?.baseURL ?? baseURL

  const _config: AxiosRequestConfig = _baseURL ? {
    baseURL: getDefaultBaseURL(env.public.api, _baseURL)
  } : {
    ...param,
    baseURL: _baseURL ?? env.public.api
  };

  const instance = axios.create(_config);

  instance.interceptors.response.use(response => {
    const {customStatus} = response.data;

    if (customStatus === undefined || customStatus === 200) {
      return response;
    }

    return Promise.reject({response});

  }, error => {
    if(error.message === 'Network Error') {
      throw new ConnectError();
    }

    if(error.code === "ECONNREFUSED" && error.syscall === 'connect' && typeof error.address === 'string' && typeof error.port === 'number') {
      throw new ConnectError();
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
