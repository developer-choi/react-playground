import React from "react";
import {useQuery} from "@tanstack/react-query";
import {EMPTY_ARRAY} from "@util/extend/data-type/array";

// URL: http://localhost:3000/solution/rq/basic
export default function Page() {
  const list = useSomeQuery("some-param");

  return (
    <>
      {list.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </>
  );
}

/** API함수로 따로 분리
 * 1. API의 Request 명세에 맞게 요청값 수정
 * 2. API 응답을 화면에서 보여주기 좋게 가공해서 반환
 */
async function getSomeApi() {
  return {
    list: []
  };
}

/** 별도의 RQ함수로 따로 분리
 * 1. API는 API고, 캐싱전략은 캐싱전략임. 서로 다름. 캐싱전략만 따로 함수로 분리해야함.
 * 2. 흔하게 쓰는 패턴은 배열 반환하는거라서, 직접 까서 반환하기.
 */
function useSomeQuery(apiRequestParam: any) {
  const {data} = useQuery({
    queryKey: ["some-key", apiRequestParam],
    queryFn: getSomeApi
  });

  return data?.list ?? EMPTY_ARRAY;
}
