import {TransitionOptions, useRouter} from 'next/router';
import {useCallback} from 'react';
import {cleanQuery} from '@util/extend/browser/query-string';
import type {UrlObject} from 'url';
import {replaceMultiple} from '@util/extend/data-type/string';

type TypedQuery<K extends string> = Partial<Record<K, undefined | string | number>>;
type TypedParam<P extends string> = Record<P, string | number>;

export function useKeepQuery<K extends string, P extends string>() {
  const router = useRouter();

  const getKeepQuery = useCallback((query: TypedQuery<K>, param?: TypedParam<P>) => {
    const previousQuery = {...router.query};

    if (param) {
      Object.keys(param).forEach(key => {
        delete previousQuery[key];
      });
    }

    const pathname = !param ? getRealPathname(router.asPath) : replaceMultiple({
      original: router.pathname,
      replaceRecord: param,
      keyCallback: key => `[${key}]`
    });

    return {
      pathname,
      query: cleanQuery({
        ...previousQuery,
        ...query
      }),
    } as UrlObject;
  }, [router.asPath, router.pathname, router.query]);

  /**
   * Keep existing query
   * Keep existing pathname
   */
  const pushKeepQuery = useCallback((query: TypedQuery<K>, params?: TypedParam<P>, options?: TransitionOptions) => {
    router.push(getKeepQuery(query, params), undefined, options);
  }, [getKeepQuery, router]);

  const replaceKeepQuery = useCallback((query: TypedQuery<K>, params?: TypedParam<P>, options?: TransitionOptions) => {
    router.replace(getKeepQuery(query, params), undefined, options);
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
