export function getCurrentlyToken() {
  return localStorage.getItem('JWT_TOKEN');
}

export interface RunIfLoggedInConfig {
  showAlert?: boolean;
  callback: LoggedInCallback;
}

export type LoggedInCallback = (userKey: string) => Promise<void>;

export function runIfLoggedIn({callback, showAlert = true}: RunIfLoggedInConfig) {
  const token = getCurrentlyToken();
  
  if (!token) {
    if (showAlert) {
      alert('로그인 후 이용이 가능합니다.');
    }
    location.replace('/login?redirectUrl=' + location.pathname); //또는 Redirect.replace로
    return;
  }
  
  callback(token).then();
}
