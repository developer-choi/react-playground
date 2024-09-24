import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import {ConvertableQuery, stringifyQuery} from '@/utils/extend/browser/query-string/convert';

export interface NavigateQueryParam {
  query: ConvertableQuery;
  pathname?: string; // 없으면 현재 위치한 pathname대로 이동
}

export function useNavigation() {
  const router = useRouter();

  const getHref = useCallback((param: NavigateQueryParam) => {
    const {pathname = location.pathname, query} = param;
    return pathname + stringifyQuery(query);
  }, []);

  const replace = useCallback((param: NavigateQueryParam) => {
    return router.replace(getHref(param));
  }, [getHref, router]);

  const push = useCallback((param: NavigateQueryParam) => {
    return router.push(getHref(param));
  }, [getHref, router]);

  return {
    replace,
    push
  };
}
