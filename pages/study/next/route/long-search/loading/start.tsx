import React, {useCallback, useEffect} from "react";
import Link from "next/link";
import Button from "@component/atom/element/Button";
import {useRouter} from "next/router";
import {useAppDispatch} from "@store/hooks";
import {closeLoadingLayer, openLoadingLayer} from "@store/reducers/loading-layer";

/** Flow
 * ./cursor/start에서 해결하지못했던 문제는 모바일이었음.
 * PC는 커서가 보여서 마우스커서가 로딩으로 변해도 ㄱㅊ
 * 하지만 모바일 디바이스에서는 답이없음.
 * 그래서 페이지 이동간 로딩을 보여주는방식으 바꿔봤음.
 *
 * 어떤웹사이트였는지는 기억안나지만 페이지이동간에 이런거 보여주는곳이 있긴했음.
 */
export default function Page() {
  usePageLoading();

  const {push} = useRouter();

  const onClick = useCallback(() => {
    push(DESTINATION_PATH);
  }, [push]);

  return (
    <>
      <Link href={DESTINATION_PATH}>도착페이지로가는 링크</Link>
      <Button onClick={onClick}>도착페이지로가는 버튼</Button>
    </>
  );
}

const DESTINATION_PATH = "/study/next/route/long-search/loading/destination";

export function usePageLoading() {
  const {events} = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const routeChangeStartHandler = () => {
      dispatch(openLoadingLayer());
    };

    const routeChangeCompleteHandler = () => {
      dispatch(closeLoadingLayer());
    };

    events.on("routeChangeStart", routeChangeStartHandler);
    events.on("routeChangeComplete", routeChangeCompleteHandler);

    return () => {
      events.off("routeChangeStart", routeChangeStartHandler);
      events.off("routeChangeComplete", routeChangeCompleteHandler);
    };
  }, [dispatch, events]);
}
