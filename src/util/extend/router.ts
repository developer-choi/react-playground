import {TransitionOptions, useRouter} from 'next/router';
import {useCallback} from 'react';
import {cleanQuery} from '@util/extend/browser/query-string';
import type {ParsedUrlQueryInput} from 'querystring';
import type {UrlObject} from 'url';
import {EMPTY_ARRAY} from '@util/extend/data-type/array';

export function useKeepQuery(removeParamKeys: string[] = EMPTY_ARRAY) {
  const router = useRouter();

  const getKeepQuery = useCallback((query: ParsedUrlQueryInput) => {
    const previousQuery = {...router.query};

    removeParamKeys.forEach(key => {
      delete previousQuery[key];
    });

    return {
      pathname: getRealPathname(router.asPath),
      query: cleanQuery({
        ...previousQuery,
        ...query
      })
    } as UrlObject;
  }, [removeParamKeys, router.asPath, router.query]);

  /**
   * Keep existing query
   * Keep existing pathname
   */
  const pushKeepQuery = useCallback((query: ParsedUrlQueryInput, options?: TransitionOptions) => {
    router.push(getKeepQuery(query), undefined, options);
  }, [getKeepQuery, router]);

  const replaceKeepQuery = useCallback((query: ParsedUrlQueryInput, options?: TransitionOptions) => {
    router.replace(getKeepQuery(query), undefined, options);
  }, [getKeepQuery, router]);

  return {
    getKeepQuery,
    pushKeepQuery,
    replaceKeepQuery
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
