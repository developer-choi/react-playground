import React, {useCallback} from "react";
import {range} from "@util/extend/data-type/number";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Button from "@component/atom/element/Button";
import useCounter from "@util/services/counter";

// URL: http://localhost:3000/study/rq/query/set-query-data
export default function Page() {
  const {increase, count} = useCounter({
    initial: 11
  });

  const {data} = useQuery({
    queryKey: ['some-query'],
    queryFn: api,
    refetchOnWindowFocus: false
  });

  const queryClient = useQueryClient();

  const update = useCallback(() => {
    queryClient.setQueryData(["some-query"], (prevValue) => {
      console.log("prevValue", prevValue);
      return (prevValue as Item[]).concat(makeItem(count));
    });

    increase();
  }, [count, increase, queryClient]);

  return (
    <>
      <Button onClick={update}>Update</Button>
      {data?.map(({pk, name}) => (
        <div key={pk}>
          {name}
        </div>
      ))}
    </>
  );
}

function makeItem(pk: number): Item {
  return {
    pk: pk,
    name: `name-${pk}`
  };
}

interface Item {
  pk: number;
  name: string;
}

async function api(): Promise<Item[]> {
  return range(1, 10).map(pk => makeItem(pk));
}
