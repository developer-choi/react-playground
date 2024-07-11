interface NextNavigatingParam {
  redirectUrl: string; // pathname + querystring
  isLoggedIn: boolean;
  nextPathname: string;
}

export type NextNavigatingResult = {
  type: "not-authenticated";
  nextUrl: `/guest/login?redirect=${string}`
} | {
  type: "already-authenticated";
  nextUrl: `/`
} | {
  type: "correct"
};

export function getNextNavigating({redirectUrl, nextPathname, isLoggedIn}: NextNavigatingParam): NextNavigatingResult {
  const isPrivate = PRIVATE_PATHNAMES.some(pathname => nextPathname.startsWith(pathname));
  const isNotPrivate = NOT_PRIVATE_PATHNAME.some(pathname => nextPathname.startsWith(pathname));

  if (isPrivate && !isLoggedIn) {
    return {
      type: "not-authenticated",
      nextUrl: `/guest/login?redirect=${redirectUrl}`
    };
  } else if (isNotPrivate && isLoggedIn) {
    return {
      type: 'already-authenticated',
      nextUrl: "/" as const
    }

  } else {
    return {
      type: "correct"
    };
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const PRIVATE_PATHNAMES = [
  "/mypage"
];

const NOT_PRIVATE_PATHNAME = [
  "/guest",
];
