import React, {useCallback} from "react";
import {range} from "@util/extend/data-type/number";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Button from "@component/atom/element/Button";
import {safeUpdateCallback} from "@util/extend/react-query";

/**
 * URL: http://localhost:3000/study/rq/use-query/set-query-data
 * useQuery는, 해당 쿼리키로 캐시데이터가 바뀌기만 하면 리렌더링할 수 있도록 구독하는 함수정도로 이해하면됨.
 * 그래서 Update버튼 눌러서 setQueryData 호출되면 다시 리렌더링될 수 있는거임.
 */
export default function Page() {
  const {data} = useQuery({
    queryKey: ["some-query"],
    queryFn: api,
    refetchOnWindowFocus: false
  });

  const queryClient = useQueryClient();

  const update = useCallback(() => {
    queryClient.setQueryData(
      ["some-query"],
      safeUpdateCallback<Item[]>((prevValue) => {
        return prevValue.concat(makeItem());
      })
    );
  }, [queryClient]);

  return (
    <>
      <Button onClick={update}>Update</Button>
      {data?.map(({pk, name}) => <div key={pk}>{name}</div>)}
    </>
  );
}

function makeItem(): Item {
  const pk = new Date().getTime();

  return {
    pk,
    name: `name-${pk}`
  };
}

interface Item {
  pk: number;
  name: string;
}

async function api(): Promise<Item[]> {
  return range(1, 10).map(() => makeItem());
}
