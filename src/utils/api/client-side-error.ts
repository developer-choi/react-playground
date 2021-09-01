import { getLoginRedirectUrl } from '../auth/auth';
import { useEffect } from 'react';
import { CustomAxiosError } from '../../api/BaseApi';
import Router from 'next/router';

const UN_EXPECTED_MESSAGE = '잠시후 다시 시도해주세요.';

export interface HandleableError {
  action: 'OPEN_POPUP';
  args: { message: string, onConfirm?: () => void } | any;
}

const DEFAULT_HANDLEABLE_ERROR: HandleableError = {
  action: 'OPEN_POPUP',
  args: {
    message: UN_EXPECTED_MESSAGE
  }
};

export function convertErrorToHandleable(error: ClientSideError): HandleableError {
  switch (error.config?.cause) {
    case 'UN_AUTHENTICATION':
      return {
        action: 'OPEN_POPUP',
        args: {
          message: error.message,
          onConfirm: () => {
            const {pathname, search, hash} = location;
  
            /**
             * TODO 기존 페이지 URL에 쿼리스트링같은게 있을 수 있으니 이런것도 같이 redirectUrl의 query-string으로 들어갈 수 있도록 구현이 필요.
             */
            Router.replace(getLoginRedirectUrl(`${pathname}${search}${hash}`)).then();
          }
        }
      };
    default:
      return DEFAULT_HANDLEABLE_ERROR;
  }
}

/**
 * TODO
 * 여기의 cause (원인)과 위에서는 action으로 분리했는데,
 * 같은 원인이어도 처리방법은 에러가 발생한 위치에 따라서 다르게 처리될 수도 있다는 생각이 들어서 이렇게했음.
 * 이 파일에서는 클라이언트 사이드에서 로그인안한 경우에 대해서 작성되었음.
 *
 * 일단 이 방식의 문제는, server-side-error에서도 ServerSideError라는 Error 클래스가 생성됬고,
 * 여기서도 ClientSideError라는 클래스가 생성됬는데,
 * 원인이라는 property가 추가됬는데 "ClientSide"Error라는 의미가 있는지 잘 모르겠다.
 *
 * 에러클래스가 추가되면 반드시 변환함수도 같이 추가가 되야하는데 (위의 HandleableError처럼)
 * 오히려 이게 더 복잡하게 만들고있는것같다.
 * 좀 더 좋은방법을 찾아보기로.
 */
export interface ClientSideErrorConfig {
  cause: 'UN_AUTHENTICATION';
}

export class ClientSideError extends Error {
  readonly config?: ClientSideErrorConfig;
  
  constructor(message: string, config?: ClientSideErrorConfig) {
    super(message);
    this.config = config;
  }
}

const MUST_LOGIN_ERROR_CODE = 700;
const SOME_JUST_ALERT_ERROR_CODE = 9999;
const SOME_MUST_LOGOUT_ERROR_CODE = 1234;

export function handleErrorInClientSide(error: CustomAxiosError | ClientSideError | any) {

  if (!(error instanceof CustomAxiosError) && !(error instanceof ClientSideError) && !error.response) {
    alert(UN_EXPECTED_MESSAGE);
    return;
  }
  
  if(error instanceof ClientSideError) {
    const { action, args } = convertErrorToHandleable(error);
    
    switch (action) {
      case 'OPEN_POPUP':
        alert(args.message);
        args.onConfirm?.();
    }
    
    return;
  }
  
  const { response: { status }, message } = error as Required<CustomAxiosError>;
  
  switch (status) {
    case MUST_LOGIN_ERROR_CODE:
      handleAuthError(error);
      break;
    
    case SOME_MUST_LOGOUT_ERROR_CODE:
      console.log('logout process..');
      break;
    
    case SOME_JUST_ALERT_ERROR_CODE:
    default:
      alert(message);
  }
}

export function useResetIgnoreForceLogin() {
  useEffect(() => {
    return () => {
      window.ignoreForceLogin = false;
    };
  }, []);
}

export function handleAuthError(error: CustomAxiosError) {
  const { message } = error;
  
  if (!window.ignoreForceLogin && !location.href.startsWith('/login')) {
    window.ignoreForceLogin = true;
    alert(message);
    window.location.href = getLoginRedirectUrl(location.href);
  }
}
