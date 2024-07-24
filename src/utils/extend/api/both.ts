import {Session} from "next-auth";
import {LoginError} from '@/utils/service/auth/redirect';

/**
 * 해당 모듈은, server / client side 양쪽에서 호출할 수 있도록
 * 어느 한쪽에서만 동작하는 코드를 작성하지 밀아야합니다.
 * Doc : https://docs.google.com/document/d/1Mi1vh2OR45EOhj63jl3cq_5ZKscFb1uVMkVYn180IMw/edit#heading=h.jdcuemqp6ojl
 */

/**
 * @throws LoginError 세션정보가 없는 상태로 API를 호출하려고 시도하거나, API에서 401에러가 응답된 경우 발생
 */
export async function customFetchInBothSide(input: string | URL | globalThis.Request, parameter: CustomFetchParameter) {
  const request = handleRequest(input, parameter);
  const response = await fetch(request.input, request.init);
  return handleResponse(response);
}

function handleRequest(input: string | URL | globalThis.Request, parameter: CustomFetchParameter) {
  const {headers, session, authorize, body, ...init} = parameter;
  const newHeaders = new Headers(headers);

  switch (authorize) {
    case "public": {
      if (session) {
        newHeaders.set("access-token'", session.user.access_token);
      }
      break;
    }
    case "private": {
      if (!session) {
        throw LOGIN_ERROR;
      } else {
        newHeaders.set("access-token'", session.user.access_token);
      }
      break;
    }

    case "none":
    default:
      break;
  }

  // GET의 경우에는 없고, 그 외 나머지는 JSON이 될 수도, Primitive일 수도 있음.
  if (typeof body === "object") {
    newHeaders.set("Content-Type", "application/json");
  }

  // TODO URL 앞에 env로 개발환경 / 운영환경 셋팅하는부분은 추후 추가
  const requestUrl = typeof input !== "string" || input.startsWith("http") ? input : `http://localhost:3000/${input}`;

  return {
    input: requestUrl,
    init: {
      headers: newHeaders,
      body: typeof body === "object" ? JSON.stringify(body) : body,
      ...init
    }
  }
}

async function handleResponse(response: Response) {
  const contentType = response.headers.get("Content-Type");
  let json = {};
  let text = '';

  if (contentType && contentType.includes("application/json")) {
    json = await response.json();
  } else {
    text = await response.text();
  }

  const customResponse: CustomResponse = {
    status: response.status,
    url: response.url,
    headers: response.headers,
    json,
    text
  };

  if (response.ok) {
    return customResponse;
  } else if (response.status === 401) {
    throw LOGIN_ERROR;
  } else {
    return Promise.reject(customResponse);
  }
}

// Client Side / Server Side 각 환경에서 한번 더 확장한 fetch 함수 만들 때 이 타입을 사용
export interface ExtendedCustomFetchParameter extends Omit<RequestInit, 'body'> {
  body?: RequestInit['body'] | object;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

  /**
   * none = request에 accessToken을 싣지않음.
   * public = 로그인되어있으면 accessToken을 request에 실음
   * private = public 특징 포함하며, 로그인 안되어있으면 LoginError 던짐
   */
  authorize: 'private' | 'public' | 'none';
}

export interface CustomFetchParameter extends ExtendedCustomFetchParameter {
  session: Session | null;
}

export interface CustomResponse extends Pick<Response, 'status' | 'headers' | 'url'> {
  json: any; // TODO 추후 제네릭 추가예정
  text: string | '';
}

const LOGIN_ERROR = new LoginError("Login is required");
