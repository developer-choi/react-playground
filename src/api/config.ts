import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import ConnectError from '@util/services/handle-error/ConnectError';
import env from '@util/env';
import {getLoginTokenInCookie, LOGIN_TOKEN} from '@util/services/auth/auth-token';
import {removeCookie} from '@util/extend/browser/cookie';
import type {GetServerSidePropsContext} from 'next';

function makeAxiosInstance(context?: GetServerSidePropsContext): AxiosInstance {
  const _config: AxiosRequestConfig = {
    baseURL: env.public.api
  };

  const instance = axios.create(_config);

  instance.interceptors.request.use(config => {
    const loginToken = getLoginTokenInCookie({
      context
    })

    if (loginToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers['Authorization'] = `Bearer ${loginToken.accessToken}`
    }

    return config
  })

  instance.interceptors.response.use(response => {
    const {customStatus} = response.data;

    if (customStatus === undefined || customStatus === 200) {
      return response;
    }

    return Promise.reject({response});

  }, error => {
    if(error.message === 'Network Error' || error.code === "ECONNREFUSED") {
      throw new ConnectError();
    }

    if(error.status === 401) {
      if (skip401Process) {
        return;
      }

      skip401Process = true

      //모든 microtask (api response promise)가 끝나고 나서 한번만 macrotask로 skip401Process를 초기화
      setTimeout(() => {
        skip401Process = false;
      });

      removeCookie(LOGIN_TOKEN, context);

      /**
       * 1. 브라우저에서 실행된 경우에만 리다이랙트를 해야하고,
       * 2. 현재 페이지 위치가 메인페이지가 아닐 때에만 메인페이지로 리다이랙트를 보내야 무한루프가 돌지않습니다. (계속 메인페이지로 보내는 버그방지)
       */
      if (!context && location.pathname !== '/') {
        location.replace('/');
      }
    }

    throw error;
  });

  return instance;
}

let skip401Process = false

export const axiosInstance = makeAxiosInstance();

export function getAxiosInstance(context?: GetServerSidePropsContext) {
  if (context) {
    return makeAxiosInstance(context);
  } else {
    return axiosInstance;
  }
}

export type AxiosErrorWithResponse = AxiosError & {response: AxiosResponse};

export function haveAxiosResponse(error: any): AxiosErrorWithResponse | undefined {
  if (!error.isAxiosError) {
    return undefined;
  }

  return error;
}
