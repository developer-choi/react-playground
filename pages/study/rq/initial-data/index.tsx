import React, {useCallback} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useLogWhenAllRendering} from "@util/extend/test";
import Button from "@component/atom/element/Button";
import Link from "next/link";

/** Flow 1. initialData 테스트
 * http://localhost:3000/study/rq/initial-data 에서
 * 페이지 뜨자마자 버튼 광클해도 2초동안 API 호출안됨.
 * 그 이유는, initialData도 staleTime에 영향을 주기때문. (마치 initialData로 setQueryData하고 시작하는듯한 동작)
 */

/** Flow 2. initialData + 페이지이동 테스트
 * http://localhost:3000/study/rq/initial-data 에서
 * /study/rq/initial-data/inactive 페이지로 이동 (queryKey를 inactive상태로 만듬)
 *
 * 그 다음, inactive 페이지에서 destination 링크를 누름.
 * destination 페이지에서는 최초 렌더링 때부터 데이터가 initial data가 아닌 패칭됐던 데이터가 들어있음.
 * (= initialData를 지정하더라도 해당 쿼리키로 업데이트 된게 있으면 기존 initialData를 무시함.)
 */

/** 결론
 * useAuth()를 여러 페이지에서 호출하더라도, initialData인 'checking'은 최초한번만 작동된다는것을 테스트로 증명)
 */
export default function Page() {
  const {data} = useQuery({
    queryKey: QUERY_KEY,
    enabled: false,
    initialData: "initial data"
  });

  useLogWhenAllRendering("data", data);

  const queryClient = useQueryClient();
  const onClick = useCallback(() => {
    queryClient.fetchQuery({
      queryKey: QUERY_KEY,
      queryFn: getApi,
      staleTime: 2000
    });
  }, [queryClient]);

  return (
    <>
      <Button onClick={onClick}>Manually fetch</Button>
      <Link href="/study/rq/initial-data/inactive">
        <a style={{display: "block"}}>/study/rq/initial-data/inactive</a>
      </Link>
    </>
  );
}

const QUERY_KEY = ["stale-time/initial-data"];

async function getApi() {
  return new Date().getTime();
}
