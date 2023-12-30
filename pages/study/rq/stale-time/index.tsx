import React, {useCallback} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useLogWhenRendering} from '@util/extend/test';
import Button from '@component/atom/element/Button';
import moment from 'moment';

/** Flow (탭전환없이 해당 페이지에서 진행해야함. 개발자도구로도 포커스가 가면안됨)
 * 1. 10초동안 매우빠르게 지속적으로 버튼 광클하면,
 * 2. API가 응답된 이후 8초가 지나지않으면 버튼 계속 클릭해도 API 호출안됨 > fetchQuery({staleTime})의 동작
 */

/** Flow
 * 1. 최초에 탭 전환 꾸준히 해보면
 * 2. 2초마다 데이터 계속 최신화되는게 보일거고, (refetchOnWindowFocus)
 * 3. 합쳐서 최초기준 8초 (fetchQuery()의 staleTime)가 지났는지 확인해보고
 * 4. 최초기준 8초가 지났으면 버튼 클릭했을 때 API 호출 되는것도 눈으로 볼 수 있음.
 * (= 가장 마지막으로 해당 쿼리키로 저장된 데이터의 시각과, fetchQuery()의 staleTime의 8초와 비교하지 useQuery()의 staleTime의 2초는 이 때 영향을 전혀안줌)
 */

// URL: http://localhost:3000/study/rq/stale-time
export default function Page() {
  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: ['call-api/manually'],
    queryFn: someApi,

    /**
     * (1) 해당 쿼리키가 처음으로 마운트됐을 때, 또는 refetch할 때
     * (2) 해당 쿼리키로 저장된 데이터의 시각이
     * (3) 2초가 지나지 않으면
     * (4) queryFn이 호출되지않음.
     *
     * 그래서 이 값은, 아래에 queryClient.fetchQuery()와 전혀 ....상관이없는건아니고, 간접적으로 영향을 주긴줌.
     */
    staleTime: 2000,
  });

  const onClick = useCallback(() => {
    queryClient.fetchQuery({
      queryKey: ['call-api/manually'],
      queryFn: someApi,

      /**
       * 이건 refetch가 아닌, fetch할 때 stale인지 아닌지 체크하는 기준으로만 사용됨.
       * (1) 이 queryClient.fetchQuery()가 호출될 때 기준으로
       * (2) 해당 쿼리키로 저장된 데이터의 시각이
       * (3) 8초가 지나지 않으면
       * (4) queryFn이 호출되지않음.
       *
       * 그래서 이 값은, 위에 useQuery option에 있는 staleTime과 전혀 ....상관이없는건아니고, 간접적으로 영향을 주긴줌.
       */
      staleTime: 8000
    });
  }, [queryClient]);

  useLogWhenRendering('re-rendering', data);

  return (
    <Button onClick={onClick}>Call someApi by fetchQuery</Button>
  );
}

async function someApi() {
  console.log('The someApi() called.');
  return moment().format('HH:mm:ss');
}
