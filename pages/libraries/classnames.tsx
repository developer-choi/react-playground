import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import libraryClassName, {myClassName} from '../../src/utils/libraries/classnames';

export default function ClassnamesPage() {
  
  return (
      <>
        <Head>
          <title>classnames</title>
        </Head>
        <SomeComponent className={libraryClassName(false, undefined, null, '', 0)}/>
        <SomeComponent className={libraryClassName('active')}/>
        <SomeComponent className={libraryClassName('disabled')}/>
        <SomeComponent className={libraryClassName({disabled: false, active: true})}/>
        <SomeComponent className={libraryClassName({disabled: true, active: true})}/>
        <SomeComponent className={myClassName({disabled: undefined, active: true}, 'disabled')}/>
      </>
  );
}

const SomeComponent = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  
  &.active {
    background: red;
  }
  
  &.disabled {
    background: lightgray;
  }
`;
