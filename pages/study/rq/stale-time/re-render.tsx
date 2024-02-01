import React from "react";
import Button from "@component/atom/element/Button";
import {useLogWhenAllRendering} from "@util/extend/test";
import {useQuery} from "@tanstack/react-query";
import {useForceReRender} from "@util/extend/react";

/** Flow
 * 1. 버튼을 매우 빠르게 한 10초정도 지속적으로 광클 ==> API는 더이상 호출되지않음.
 * >> staleTime은 re-rendering될 때 다시 체크되지않음.
 */

// URL: http://localhost:3000/study/rq/stale-time/re-render
export default function Page() {
  const forceReRender = useForceReRender();

  useQuery({
    queryKey: ["call-api/indirectly"],
    queryFn: specialApi,
    staleTime: 500
  });

  useLogWhenAllRendering("re-rendering");

  return <Button onClick={forceReRender}>Call specialApi (RQ) indirectly</Button>;
}

async function specialApi() {
  console.log("The specialApi() called.");
  return new Date().getTime();
}
