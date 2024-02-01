import React, {FormEvent, useCallback} from "react";
import {useToggle} from "@util/extend/react";
import {useClickOutside} from "@util/extend/event/event";
import styled from "styled-components";
import Button from "@component/atom/element/Button";

// URL: http://localhost:3000/experimental/click-outside/bug2
export default function Page() {
  const {value: visible, setTrue: openBox, setFalse: closeBox} = useToggle();

  const {wrapperRef, ignoreClassName} = useClickOutside<HTMLDivElement>({
    ignoreClassName: "ignore-target",
    callback: closeBox,
    debug: "recent-history"
  });

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted.");
  }, []);

  /** 버그1
   * 1. 인풋창에 포커스 주면 박스가 생김
   * 2. 이 때 인풋창에 커서둔상태로 엔터치면
   * 3. 박스가 사라짐.
   *
   * 원인: 인풋박스에 엔터치면, 제출버튼이 클릭됨. (서브밋버튼이라)
   */

  /** 버그2
   * 1. 인풋창에 포커스 주면 박스가 생김
   * 2. 박스 안에 Click Me 버튼을 클릭
   * 3. 박스가 사라짐.
   */
  return (
    <>
      <form onSubmit={onSubmit}>
        <Input className={ignoreClassName} onFocus={openBox} />
        <Button type="submit">제출</Button>
      </form>
      {!visible ? null : (
        <Box ref={wrapperRef}>
          <SelfHiddenButton />
        </Box>
      )}
    </>
  );
}

/**
 * 주로 삭제버튼을 생각하며 예제를 만들었음.
 * 최근검색어 목록을 보여주면서, 항목마다 X버튼을 보여주고,
 * X버튼을 누르면 그 항목이 사라지는 예제를 가정하고 만들었음.
 * 실제로는 삭제콜백함수를 onClick props로 받음.
 */
function SelfHiddenButton() {
  const {value: visible, setFalse: closeButton} = useToggle(true);

  if (!visible) {
    return null;
  }

  return (
    <button type="button" onClick={closeButton}>
      Click Me
    </button>
  );
}

const Box = styled.div`
  position: absolute;
  left: 300px;
  top: 100px;
  width: 100px;
  height: 100px;
  background-color: red;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid black;
`;
