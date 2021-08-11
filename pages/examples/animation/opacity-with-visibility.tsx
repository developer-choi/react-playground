import React, {useCallback, useState} from 'react';
import Head from 'next/head';
import {Button, ReactButton} from '@components/atom/button/button-presets';
import styled from 'styled-components';
import {myClassName} from '../../../src/utils/libraries/classnames';

export default function OpacityWithVisibilityPage() {
  
  const [active, setActive] = useState(true);
  
  const onClick = useCallback(() => {
    alert('Clicked');
  }, []);
  
  const toggle = useCallback(() => {
    setActive(prevState => !prevState);
  }, []);
  
  return (
      <>
        <Head>
          <title>opacity-with-visibility</title>
        </Head>
        <div>
          <Button onClick={toggle}>Toggle</Button>
          <CustomButton className={myClassName({active})} onClick={onClick}>CLICK ME</CustomButton>
          <OpacityVisibilityButton className={myClassName({active})} onClick={onClick}>CLICK ME</OpacityVisibilityButton>
        </div>
      </>
  );
}

const CustomButton = styled(ReactButton)`
  transition: opacity 2s, visibility 30s, background-color 0.5s;
  opacity: 0;
  visibility: hidden;
  
  &.active {
    opacity: 1;
    visibility: visible;
    background-color: red;
  }
`;

const OpacityVisibilityButton = styled(ReactButton)`
  transition: opacity, visibility, 1s;
  opacity: 0;
  visibility: hidden;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;
