import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {cleanQuery} from '@util/extend/browser/query-string';
import type {ParsedUrlQueryInput} from 'querystring';
import type {UrlObject} from 'url';

export function useKeepQuery() {
  const router = useRouter();

  /**
   * Keep existing query
   * Keep existing pathname
   */
  const pushKeepQuery = useCallback((query: ParsedUrlQueryInput, pathname?: string, removeParams: string[] = []) => {
    const removeQuery = removeParams.reduce((a, b) => {
      // eslint-disable-next-line no-param-reassign
      a[b] = undefined;
      return a;
    }, {} as Record<string, undefined>);

    const urlObject: UrlObject = {
      pathname: pathname ? pathname : getRealPathname(router.asPath),
      query: cleanQuery({
        ...router.query,
        ...removeQuery,
        ...query
      })
    };

    router.push(urlObject);
  }, [router]);

  return {
    pushKeepQuery
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
