export class LoginError extends Error {
  readonly loginUrlWithRedirect: string; // 로그인페이지 URL에 리다이랙트 URL까지 포함된 값 ex: /guest/login?redirect=...

  constructor(message: string, loginUrlWithRedirect = '/') {
    super(message);
    this.loginUrlWithRedirect = loginUrlWithRedirect;
  }
}
