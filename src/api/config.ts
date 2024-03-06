import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import ConnectError from '@util/services/handle-error/ConnectError';
import env from '@util/env';
import {getLoginTokenInCookie, LOGIN_TOKEN} from '@util/services/auth/auth-token';
import {removeCookie} from '@util/extend/browser/cookie';
import type {GetServerSidePropsContext} from 'next';
import {AuthError} from '@util/services/auth/auth-redirect';

function makeAxiosInstance(context?: GetServerSidePropsContext): AxiosInstance {
  const _config: AxiosRequestConfig = {
    baseURL: env.public.api
  };

  const instance = axios.create(_config);

  instance.interceptors.request.use(config => {
    const loginToken = getLoginTokenInCookie({
      context
    });

    if (loginToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers['Authorization'] = `Bearer ${loginToken.accessToken}`;
    }

    return config;
  });

  instance.interceptors.response.use(response => {
    const {customStatus} = response.data;

    if (customStatus === undefined || customStatus === 200) {
      return response;
    }

    return Promise.reject({response});

  }, error => {
    if (error.message === 'Network Error' || error.code === 'ECONNREFUSED') {
      throw new ConnectError();
    }

    if (error.status !== 401) {
      throw error;
    }

    // 401 error process
    if (skip401Process) {
      return;
    }

    skip401Process = true;

    //모든 microtask (api response promise)가 끝나고 나서 한번만 macrotask로 skip401Process를 초기화
    setTimeout(() => {
      skip401Process = false;
    });

    removeCookie(LOGIN_TOKEN, context);

    const redirectPath = context ? context.resolvedUrl : `${location.pathname}${location.search}${location.hash}`;

    /**
     * Server Side에서 발생했던 Client Side에서 발생했던 간에 로그인페이지로 보내기위함.
     * Server Side = 현재 탭에서 로그인되어있고 다른탭에서 회원탈퇴해놓고 현재 탭에서 마이페이지를 이동하는경우, 거기 Server Side에서 catch문에서 handleServerSideError()로 잡힘.
     * Client Side = 동일한 상황에서, 현재 탭에서 좋아요 버튼을 누르는 경우 handleClientSideError에서 잡혀서 로그인페이지로 갈거임.
     * Client Side (2) = 마이페이지 안에서 그냥 자동으로 effect function 같은곳에서 API 호출하다 401에러가 발생할 경우, 동일하게 잡혀서 로그인페이지로 갈거임.
     */
    throw new AuthError('인증되지 않은 회원입니다. 다시 로그인하시겠습니까?', {redirectPath});
  });

  return instance;
}

let skip401Process = false;

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
