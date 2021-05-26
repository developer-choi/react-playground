import React from 'react';
import Head from 'next/head';
import styled, {keyframes} from 'styled-components';

export default function ChildrenFixedParentTransformPage() {
  
  return (
      <>
        <Head>
          <title>children-fixed-parent-transform</title>
        </Head>
        <div>
          <Parent/>
        </div>
      </>
  );
}

const moveAnimate = keyframes`
  to {
    transform: translateY(200px);
  }
`;

const ParentWrap = styled.div`
  animation: ${moveAnimate} 1.5s infinite alternate 0.5s linear;
`;

function Parent() {
  return (
      <ParentWrap>
        <Children/>
      </ParentWrap>
  );
}

const ChildWrap = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  left: 100px;
  top: 100px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  font-size: 16px;
  text-align: center;
`;

function Children() {
  return (
      <ChildWrap>
        position fixed로 고정되어있음.
        <br/>
        그런데 부모에 transform이 걸려있음.
      </ChildWrap>
  );
}
