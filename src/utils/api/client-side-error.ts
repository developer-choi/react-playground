import { getLoginRedirectUrl } from '../auth/auth';
import { useEffect } from 'react';
import { CustomAxiosError, UN_EXPECTED_MESSAGE } from '../../api/BaseApi';

const MUST_LOGIN_ERROR_CODE = 700;
const SOME_JUST_ALERT_ERROR_CODE = 9999;
const SOME_MUST_LOGOUT_ERROR_CODE = 1234;

/**
 * 페이지가 렌더링된 상태에서 호출되야하는 함수.
 * 주로 버튼을 클릭했을 때 어떤 API를 호출하다가 에러가 발생했을 때 호출됨. (ex: 로그인 시도 등)
 * 반대로말하면, getServerSideProps() 같은곳에서는 호출되면 안됨. (이 경우에는 server-side-error module을 사용)
 */
export function handleErrorInClientSide(error: CustomAxiosError | any) {
  if (!(error instanceof CustomAxiosError) || !error.response) {
    alert(UN_EXPECTED_MESSAGE);
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

/**
 * 로그인페이지에서 사용하려고 만들었고,
 * 로그인페이지를 벗어나는 아래의 2가지 케이스에 대해 고려가 되었음.
 * case1. [로그인 후 이용이 가능합니다] 팝업을 만난 사용자가 로그인안하고 그냥 다른페이지를 간다거나
 * case2. 로그인을 성공하여 다른페이지로 간 사용자의 경우
 *
 * 다시 초기화를 해서 이후에 또 [로그인 해야 이용가능] 성격의 팝업을 만났을 때 이 팝업을 보여주도록 하기위해.
 *
 * handleAuthError()와 같이사용해야함.
 */
export function useResetIgnoreForceLogin() {
  useEffect(() => {
    return () => {
      /**
       * ignoreLoginProcess는 store가 아니라 window가 제일 합리적임.
       * 1. 창 하나 (또는 탭하나)에서 유일한 값이고 유지되는 값이어야 하니까.
       * 2. 이 값이 바뀌어도 다시 컴포넌트들이 리렌더링되야하는건 아니니까.
       */
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
