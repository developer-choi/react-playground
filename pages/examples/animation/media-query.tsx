import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';


/**
 * media query width에 들어가는 값은 window.innerWidth로 하면 되겠다.
 * 크롬의 경우 브라우저 크기 조절할 때 000px X 000px라고 개발자도구 왼쪽 위에 표시해주는데 이 값이랑도 일치한다.
 */
export default function MediaQueryPage() {
  
  const [innerWidth, setInnerWidth] = useState(0);
  const [outerWidth, setOuterWidth] = useState(0);
  
  useEffect(() => {
    setInnerWidth(window.innerWidth);
    setOuterWidth(window.outerWidth);
    
    window.addEventListener('resize', () => {
      setInnerWidth(window.innerWidth);
      setOuterWidth(window.outerWidth);
    });
  }, []);
  
  return (
      <>
        <Head>
          <title>media-query</title>
        </Head>
        <div>
          innerWidth = {innerWidth}<br/>
          outerWidth = {outerWidth}
          <MediaQueryWidth/>
        </div>
      </>
  );
}

const WIDTH_VALUE = 1000;

function MediaQueryWidth() {
  
  return (
      <MediaQueryWidthWrap>
        media query max-width {WIDTH_VALUE}px로 잡음.
      </MediaQueryWidthWrap>
  );
}

const MediaQueryWidthWrap = styled.div`
  margin-top: 30px;
  width: 100vw;
  height: 200vh;
  background-color: whitesmoke;
  
  @media (max-width: ${WIDTH_VALUE}px) {
    background-color: red;
  }
`;
