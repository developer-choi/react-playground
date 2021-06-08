import {useEffect} from 'react';

const GO_LOGIN_STATUS = [700];

export function handleErorr(data: any) {
  const {status, message} = data;
  
  if (status === GO_LOGIN_STATUS && !window.ignoreForceLogin && window.location.href !== '/login') {
    window.ignoreForceLogin = true;
    alert(message);
    window.location.href = '/login';
  }
}

/**
 * 로그인페이지에서 사용하려고 만들었고,
 * 로그인페이지를 벗어나는 아래의 2가지 케이스에 대해 고려가 되었음.
 * case1. [로그인 후 이용이 가능합니다] 팝업을 만난 사용자가 로그인안하고 그냥 다른페이지를 간다거나
 * case2. 로그인을 성공하여 다른페이지로 간 사용자의 경우
 *
 * 다시 초기화를 해서 이후에 또 [로그인 해야 이용가능] 성격의 팝업을 만났을 때 이 팝업을 보여주도록 하기위해/
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
