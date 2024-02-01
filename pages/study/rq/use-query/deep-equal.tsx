import React from "react";
import {useQuery} from "@tanstack/react-query";
import {useLogWhenRendering} from "@util/extend/test";

/** getEqualApi() Flow
 * 1. 탭전환을 매우 빠르게 시도하면,
 * 2. 탭전환 한만큼 API도 호출되지만
 * 3. 리렌더링은 되지않음.
 */

/** getAnotherApi() Flow
 * 1. (동일)
 * 2. (동일)
 * 3. 리렌더링이 그만큼 발생함.
 */

// URL: http://localhost:3000/study/rq/use-query/deep-equal
export default function Page() {
  const {data} = useQuery({
    queryKey: ["deep-equal"],
    // queryFn: getEqualApi
    queryFn: getAnotherApi
  });

  useLogWhenRendering("re-rendering", data?.[0].str);

  if (!data) {
    return null;
  }

  return <>{data[0].str}</>;
}

async function getEqualApi() {
  console.log("Call getEqualApi");
  return [{str: "fixed-value"}];
}

async function getAnotherApi() {
  console.log("Call getAnotherApi");
  return [{str: new Date().getTime().toString()}];
}
