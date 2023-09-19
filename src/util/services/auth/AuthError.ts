/**
 * 로그인 안해놓고 로그인이 필요한 서비스를 이용하려고 한 경우 발생
 * 구체적으로, LoginToken이 없는데 LoginToken이 필요한 API를 호출하려고 하는경우 그전에 이 에러가 떠서 막히도록 구현됨.
 */
export class AuthError extends Error {
  option: AuthErrorOption;

  constructor(message: string, option: AuthErrorOption) {
    super(message);
    this.option = option;
  }
}

interface AuthErrorOption {
  redirectUrl: string;
}
