import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {cleanQuery} from '@util/extend/query-string';
import type {ParsedUrlQueryInput} from 'querystring';

export function useKeepQuery() {
  const router = useRouter();

  /**
   * Keep existing query
   * Keep existing pathname
   */
  const push = useCallback((query: ParsedUrlQueryInput) => {
    router.push({
      pathname: getRealPathname(router.asPath),
      query: cleanQuery({
        ...router.query,
        ...query
      })
    }).then();
  }, [router]);

  return {
    push
  };
}

/**
 * @example ('/some/path?key=value#hash') ==> '/some/path'
 */
export function getRealPathname(asPath: string) {
  if (asPath.includes('?')) {
    const endIndex = asPath.indexOf('?');
    return asPath.slice(0, endIndex);

  } else if (asPath.includes('#')) {
    const endIndex = asPath.indexOf('#');
    return asPath.slice(0, endIndex);

  } else {
    return asPath;
  }
}

/**
 * @example ('/fruit/banana', '/fruit') ==> true
 * @example ('/animal/lion?key=value#hash', '/animal') ==> true
 * @example ('/animal-fake/lion', '/animal') ==> false
 */
export function isActiveLink(asPath: string, activePath: string): boolean {
  const realPathname = getRealPathname(asPath);

  if (realPathname === activePath) {
    return true;
  }

  return realPathname.startsWith(`${activePath}/`);
}
