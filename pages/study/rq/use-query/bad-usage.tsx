import React, {useCallback} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";

/**
 * URL: http://localhost:3000/study/rq/use-query/bad-usage
 * refresh 버튼 눌러도 api 호출로그 안찍히는 버그가 있음.
 * 원인은 enabled false안해서그럼.
 */
export default function Page() {
  const queryClient = useQueryClient();
  const {data} = useQuery<string>({
    queryKey: ["test"],
    // enabled: false, << useQuery를 manual하게 쓰려고 queryFn 전달 안했으면 enabled false를 꼭 같이 전달해야함.
    refetchOnWindowFocus: false
  });

  //했는데 왜 호출안됨?
  const onClick = useCallback(() => {
    console.log("clicked");
    queryClient.fetchQuery({
      queryKey: ["test"],
      queryFn: api
    });
  }, [queryClient]);

  return (
    <div>
      <button style={{padding: 10}} onClick={onClick}>
        refresh
      </button>
      <span>{data}</span>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}

async function api() {
  console.log("Call api");
  return new Date().getTime();
}
