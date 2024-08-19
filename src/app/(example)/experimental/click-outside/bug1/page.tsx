'use client';

import React, {useEffect, useRef} from 'react';
import styles from './page.module.scss';
import {useToggle} from '@/utils/extend/library/react';
import {ClickOutsideParam} from '@/utils/extend/event/click-outside';
import {useLogWhenRendering} from '@/utils/extend/test';

// URL: http://localhost:3000/experimental/click-outside/bug1
// Doc: https://docs.google.com/document/d/1KHvnJWzoV1O6sW4rkMBz0z1vZiHwRp-ulIw275Gn_ao/edit#heading=h.xcmmfoynzomp
export default function Page() {
  const {bool: visible, toggle, setFalse: closeBox} = useToggle();

  const {wrapperRef} = useLegacyClickOutside<HTMLDivElement>({
    callback: closeBox
  });

  // const {wrapperRef, ignoreClassName} = useClickOutside<HTMLDivElement>({
  //   callback: closeBox,
  //   ignoreClassName: "IGNORE"
  // });

  /**
   * 박스를 토글하는 로직과, 바깥을 클릭하는 로직이 둘 다 실행되서 결과적으로 박스가 안뜨는 버그가있음.
   * 이걸 해결하기위해 useClickOutside() 에서는 ignoreClassName을 추가했음.
   */
  useLogWhenRendering('visible', visible);

  return (
    <>
      <button onClick={toggle}>
        Toggle the box
      </button>

      {/*<Button onClick={toggle} className={ignoreClassName}>*/}
      {/*  Toggle the box*/}
      {/*</Button>*/}

      {!visible ? null : (
        <div ref={wrapperRef} className={styles.someBox}/>
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
