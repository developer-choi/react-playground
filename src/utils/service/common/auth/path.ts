import {DEFAULT_HOME_URL} from '@/utils/service/common/auth/redirect';
import {doesPathStartWithSegment, extractPathname} from '@/utils/extend/data-type/string';

interface NextNavigatingParam {
  nextUrl: string; // pathname + querystring
  isLoggedIn: boolean;
}

export type NextNavigatingResult = {
  type: 'not-authenticated';
  nextUrl: `/guest/login?redirect=${string}`
} | {
  type: 'already-authenticated';
  nextUrl: typeof DEFAULT_HOME_URL
} | {
  type: 'correct',
  nextUrl: string; // parameter로 전달했던 nextUrl과 같은 값
};

export function getNextNavigating({nextUrl, isLoggedIn}: NextNavigatingParam): NextNavigatingResult {
  const correct: NextNavigatingResult = {
    type: 'correct',
    nextUrl
  };

  const nextPathname = extractPathname(nextUrl);

  // 여기서 거르지않으면 밑에서 isPrivate, isNotPrivate에서 둘 다 true가 할당됨.
  if (nextPathname === '/') {
    return correct;
  }

  const isGuest = PATHNAME.exact.guest.includes(nextPathname) || PATHNAME.startsWith.guest.some((pathname) => doesPathStartWithSegment(pathname, nextPathname));
  const isPrivate = PATHNAME.exact.private.includes(nextPathname) || PATHNAME.startsWith.private.some((pathname) => doesPathStartWithSegment(pathname, nextPathname));

  if (isPrivate && !isLoggedIn) {
    return {
      type: 'not-authenticated',
      nextUrl: `/guest/login?redirect=${nextUrl}`
    };
  } else if (isGuest && isLoggedIn) {
    return {
      type: 'already-authenticated',
      nextUrl: DEFAULT_HOME_URL
    };

  } else {
    return correct;
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const PATHNAME = {
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
};
