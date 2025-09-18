import {NavigationGuard} from '@forworkchoe/core/utils';

export const DEFAULT_HOME_URL = '/';
export const LOGIN_URL = '/guest/login';

export const navigationGuard = new NavigationGuard({
  startsWith: {
    // 이 pathname로 시작하면 무조건 로그인해야만 갈 수 있는 페이지
    private: ['/mypage'],

    // 이 pathname로 시작하면 무조건 로그인 안해야만 갈 수 있는 페이지
    guest: ['/login'],
  },
  exact: {
    // 정확하게 pathname이 일치해야
    private: ['/some-private-path'],
    guest: ['/some-guest-path'],
  },
  homePath: DEFAULT_HOME_URL,
  loginPath: LOGIN_URL
});
