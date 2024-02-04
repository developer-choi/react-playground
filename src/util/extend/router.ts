import {TransitionOptions, useRouter} from 'next/router';
import {useCallback} from 'react';
import {cleanQuery} from '@util/extend/browser/query-string';
import type {UrlObject} from 'url';
import {replaceMultiple} from '@util/extend/data-type/string';
import {EMPTY_ARRAY} from '@util/extend/data-type/array';

type TypedQuery<K extends string> = Partial<Record<K, undefined | string | number>>;
type TypedParam<P extends string> = Record<P, string | number>;

/**
 * @param paramKeys page에 dynamic parameter를 사용하는경우 전달. (반드시 미리 변수에 할당해서 전달하여 함수를 실행할 때마다 새로 배열만들지않도록)
 */
export function useKeepQuery<K extends string, P extends string = string>(paramKeys: P[] = EMPTY_ARRAY) {
  const router = useRouter();

  const getKeepQuery = useCallback((query: TypedQuery<K>, param?: TypedParam<P>) => {
    const previousQuery = {...router.query};

    paramKeys.forEach(key => {
      delete previousQuery[key];
    });

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
  }, [paramKeys, router.asPath, router.pathname, router.query]);

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
