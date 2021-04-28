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

export function useResetIgnoreForceLogin() {
  useEffect(() => {
    return () => {
      window.ignoreForceLogin = false;
    };
  }, []);
}
