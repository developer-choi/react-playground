import React, {useCallback, useEffect} from "react";
import Link from "next/link";
import Button from "@component/atom/element/Button";
import {useRouter} from "next/router";

/** Flow
 * PC기준 링크나 버튼을 누르면, 마우스 커서가 로딩으로 바뀜.
 * 이후 페이지 이동완료되면 커서 다시 바뀜.
 *
 * 기존 문제점
 * 검색페이지에서 검색어를 입력했을 때,
 * 검색API가 응답된 이후에 검색결과페이지로 넘어가게 구현이 되어있었는데
 * 검색결과페이지는 SSR기반으로 작업이 되어있어서,
 * 검색API 응답이 느릴경우, 검색하려고 엔터쳤을 때 한참뒤에 아무런동작이 없다가 이동되는 문제가 있었음.
 *
 * 방법1.
 * 버튼에서 route.push()기반으로 라우팅을 시키는경우, await push()로 페이지이동 전후 로직을 실행시킬 수 있지만,
 * 링크로 라우팅을 시키는경우, 방법이 마땅하지가않음. (예전에 이걸로 AdvancedLink 만들려다가 잠시 중단했었음)
 *
 * 방법2.
 * router.events.on('routeChangeStart')
 * router.events.on('routeChangeComplete')
 * 이거 2개로 페이지 이동시 로딩을 보여줄 수 있음.
 * 단, start는 나가기시작 / complete는 페이지 입장성공했을 때 실행되기때문에,
 * 출발페이지와 도착페이지 양쪽에 서로 이 로직을 작성해야했음. (useBodyLoading() 호출)
 *
 * 물론 이걸 _app에 넣을 수도 있지만,
 * 로딩이란게 결국 너무 빨리 페이지가 전환되는 경우에는 오히려 보기흉해서 모든페이지에 적용하기는 애매했음.
 * 그래서 오래걸리는 페이지 전후로 각각 넣기로했음.
 */
export default function Page() {
  useBodyLoading();

  const {push} = useRouter();
  
  const onClick = useCallback(async () => {
    await push(DESTINATION_PATH);
  }, [push]);

  return (
    <>
      <Link href={DESTINATION_PATH}>
        도착페이지로가는 링크
      </Link>
      <Button onClick={onClick}>
        도착페이지로가는 버튼
      </Button>
    </>
  );
}

const DESTINATION_PATH = "/study/next/route/long-search/cursor/destination";

export function useBodyLoading() {
  const {events} = useRouter();

  useEffect(() => {
    const routeChangeStartHandler = () => {
      document.body.classList.add("loading");
    };

    const routeChangeCompleteHandler = () => {
      document.body.classList.remove("loading");
    };

    events.on("routeChangeStart", routeChangeStartHandler);
    events.on("routeChangeComplete", routeChangeCompleteHandler);

    return () => {
      events.off("routeChangeStart", routeChangeStartHandler);
      events.off("routeChangeComplete", routeChangeCompleteHandler);
    };
  }, [events]);
}
