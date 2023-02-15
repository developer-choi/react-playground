import React, {useEffect, useRef} from 'react';
import Button from '@component/atom/element/Button';
import {useToggle} from '@util/extend/react';
import styled from 'styled-components';
import type {ClickOutsideParam} from '@util/extend/event/event';

// URL: http://localhost:3000/solution/click-outside/bug1
export default function Page() {
  const {value: visible, toggle, setFalse: closeBox} = useToggle();

  const {wrapperRef} = useLegacyClickOutside<HTMLDivElement>({
    callback: closeBox
  });
  
  // const {wrapperRef, ignoreClassName} = useClickOutside<HTMLDivElement>({
  //   callback: closeBox,
  //   ignoreClassName: "IGNORE"
  // });

  useEffect(() => {
    /**
     * 박스를 토글하는 로직과, 바깥을 클릭하는 로직이 둘 다 실행되서 결과적으로 박스가 안뜨는 버그가있음.
     * 이걸 해결하기위해 useClickOutside() 에서는 ignoreClassName을 추가했음.
     */
    console.log('visible', visible);
  }, [visible]);

  return (
    <>
      <Button onClick={toggle}>
        Toggle the box
      </Button>

      {/*<Button onClick={toggle} className={ignoreClassName}>*/}
      {/*  Toggle the box*/}
      {/*</Button>*/}

      {!visible ? null : (
        <SomeBox ref={wrapperRef}/>
      )}
    </>
  );
}

function useLegacyClickOutside<T extends HTMLElement>({callback}: Pick<ClickOutsideParam, 'callback'>) {
  const wrapperRef = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) {
        return;
      }

      if (!event.target) {
        throw new Error('Unexpected error occurred. event.target is null');
      }

      const target = event.target as HTMLElement;

      const isInside = wrapperRef.current.contains(target);

      if (isInside) {
        console.log('ignored because isInside true');
        return;
      }

      callback(event);
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback]);

  return {
    wrapperRef,
  };
}


const SomeBox = styled.div`
  position: fixed;
  left: 10px;
  top: 100px;
  
  width: 200px;
  height: 200px;
  background-color: red;
`;
