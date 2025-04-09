import {DEFAULT_HOME_URL} from '@/utils/service/auth/redirect';
import {doesPathStartWithSegment, extractPathname} from '@/utils/extend/data-type/string';

interface NextNavigatingParam {
  nextUrl: string; // pathname + querystring
  isLoggedIn: boolean;
}

export type NextNavigatingResult = {
  type: "not-authenticated";
  nextUrl: `/guest/login?redirect=${string}`
} | {
  type: "already-authenticated";
  nextUrl: typeof DEFAULT_HOME_URL
} | {
  type: "correct",
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

  const isPrivate = PRIVATE_PATHNAME.some(pathname => doesPathStartWithSegment(nextPathname, pathname));
  const isNotPrivate = NOT_PRIVATE_PATHNAME.some(pathname => doesPathStartWithSegment(nextPathname, pathname));

  if (isPrivate && !isLoggedIn) {
    return {
      type: "not-authenticated",
      nextUrl: `/guest/login?redirect=${nextUrl}`
    };
  } else if (isNotPrivate && isLoggedIn) {
    return {
      type: 'already-authenticated',
      nextUrl: DEFAULT_HOME_URL
    }

  } else {
    return correct;
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const PRIVATE_PATHNAME = [
  "/mypage"
];

const NOT_PRIVATE_PATHNAME = [
  "/guest",
];
