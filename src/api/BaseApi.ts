import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import env from '@util/env';

export default class BaseApi {
  readonly axios: AxiosInstance;
  
  constructor(basePath?: string, config: AxiosRequestConfig = {}) {
    const { baseURL, ...rest } = config;
  
    this.axios = axios.create({
      baseURL: baseURL ? baseURL : getDefaultBaseURL(basePath),
      /**
       * headers: [SOME_SESSION]
       * I think adding the session information in the headers of all HTTP Requests is wrong.
       * If you do that, the session information will be included in the header of all HTTP requests.
       */
      ...rest
    });
  
    // this.axios.interceptors.response.use(response => {
    //   const {status} = response.data;
    //
    //   if (status === 200) {
    //     return response;
    //   }
    //
    //   console.error(response);
    //
    //   return Promise.reject(new CustomAxiosError(response));
    // }, (axiosError: AxiosError) => {
    //
    //   console.error(axiosError);
    //
    //   return Promise.reject(new CustomAxiosError(axiosError));
    // });
  }
}

/**
 * If API Server doesn't respond standard HTTP Status Code,
 */
export interface CustomBaseResponse {
  status: number;
  message?: string;
}

/**
 * If API Server responds as standard HTTP Response,
 * This class needs not to use.
 * This class is only for the server responding as custom HTTP Response. (If the server includes HTTP status codes in the response body)
 *
 * The motivation of this class is to make the same interface between Custom Error HTTP Response and Standard Error HTTP Response.
 */
export class CustomAxiosError implements AxiosError {
  readonly config: AxiosRequestConfig;
  readonly isCustomAxiosError: boolean;
  readonly isAxiosError: boolean;
  readonly message: string;
  readonly name: string;
  readonly response?: AxiosResponse;
  readonly request?: any;
  readonly code?: string;
  readonly toJSON: () => object;
  readonly stack?: string;
  
  constructor(parameter: AxiosResponse<CustomBaseResponse> | AxiosError) {
    if('isAxiosError' in parameter && parameter.isAxiosError) {
      const {config, response, message, code, toJSON, request, name, stack} = parameter as AxiosError;
      this.response = response;
      this.isAxiosError = false;
      this.isCustomAxiosError = true;
      this.message = message;
      this.config = config;
      this.code = code;
      this.request = request;
      this.name = name;
      this.toJSON = toJSON;
      this.stack = stack;
      return;
    }
  
    const response = parameter as AxiosResponse<CustomBaseResponse>;
    const { request, data, config } = response
    this.name = 'Error';
    this.isAxiosError = false;
    this.isCustomAxiosError = true;
    this.request = request;
    this.config = config;
    
    const { status, message } = data;
    this.message = message ?? '';
    this.response = {
      ...response,
      status, // If the response is Custom Error HTTP Response, Set up the error status code in response property like AxiosError.
    };
    
    this.toJSON = () => {
      throw Error('toJSON() is not supported');
    }
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
