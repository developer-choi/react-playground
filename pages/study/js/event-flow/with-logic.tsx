import React, {MouseEvent, useCallback, useEffect} from "react";
import Button from "@component/atom/element/Button";
import styled from "styled-components";
import {flexCenter} from "@util/services/style/css";
import useCounter from "@util/services/counter";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {increase} from "@store/reducers/counter";

// URL: http://localhost:3000/study/js/event-flow/with-logic
export default function Page() {
  const clickHandler = useCallback((name: string) => {
    return (event: MouseEvent) => {
      console.log(name, event.eventPhase);
    };
  }, []);

  const wrap1Bubble = clickHandler("wrap1 bubble");
  const buttonBubble = clickHandler("button bubble");

  /**
   * rendering 0 0 undefined (최초로그)
   *
   * 버튼을 클릭한 경우
   * button bubble
   * wrap1 bubble
   * rendering 1 1 << 렌더링 딱 한번만됨. 이벤트 전달 다 되야 렌더링 됨.
   * SomeComponent mounted
   * [window click 3] << 이부분이 제일 이해안됨 이벤트 전달 다 끝나고 나서 마운트되서 window에 addEventListener했는데 왜 전달되지?
   *
   */

  const {increase: updateState, count} = useCounter();

  const dispatch = useAppDispatch();
  const storeCount = useAppSelector((state) => state.counter.count);

  const updateStore = useCallback(() => {
    dispatch(increase());
  }, [dispatch]);

  console.log("rendering", count, storeCount);

  return (
    <>
      <Wrap1 onClick={wrap1Bubble}>
        <Wrap2 onClick={updateStore}>
          <Wrap3 onClick={updateState}>
            <Button onClick={buttonBubble}>Click Me</Button>
          </Wrap3>
        </Wrap2>
      </Wrap1>
      {count === 0 ? null : <SomeComponent />}
    </>
  );
}

function SomeComponent() {
  useEffect(() => {
    console.log("SomeComponent mounted");

    function handler(event: globalThis.MouseEvent) {
      console.log("window click", event.eventPhase);
    }

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return null;
}

const Wrap1 = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  ${flexCenter};
`;

const Wrap2 = styled.div`
  width: 300px;
  height: 300px;
  background-color: blue;
  ${flexCenter};
`;

const Wrap3 = styled.div`
  width: 200px;
  height: 200px;
  background-color: orange;
  ${flexCenter};
`;
