import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import {ConvertableQuery, stringifyQuery} from '@/utils/extend/browser/query-string/convert';

export interface NavigateQueryParam {
  query: ConvertableQuery;
  pathname?: string; // 없으면 현재 위치한 pathname대로 이동
}

export function useNavigation() {
  const router = useRouter();

  const replace = useCallback((param: NavigateQueryParam) => {
    return router.replace(getHref(param));
  }, [router]);

  const push = useCallback((param: NavigateQueryParam) => {
    return router.push(getHref(param));
  }, [router]);

  // TODO 추후 여기에 필요성이 생길 시 legacy에 있던 useKeepQuery()에 있던 기능들 추가할 예정

  return {
    replace,
    push
  };
}

function getHref(param: NavigateQueryParam) {
  const {pathname = location.pathname, query} = param;
  return pathname + stringifyQuery(query);
}
