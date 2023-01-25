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
