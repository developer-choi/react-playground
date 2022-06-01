import React, {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import InputText from '@component/extend/InputText';
import {Button} from '@component/atom/button/button-presets';
import useToggle from '@util/custom-hooks/useToggle';
import {isKeyCanBeEnteredInWindow} from '@util/extend/keyboard-event';

export default function WindowKeyDownPage() {
  const { value: enableFocusToInput, toggle: toggleEnableFocusToInput } = useToggle(false);
  
  return (
      <>
        <Head>
          <title>window-input</title>
        </Head>
        <div>
          <StyledButton className={enableFocusToInput ? 'active' : ''} onClick={toggleEnableFocusToInput}>입력시 포커스이동 활성화</StyledButton>
          {enableFocusToInput ?
              <WindowKeyDownFocusToInput/>
              :
              <WindowKeyDownTest/>
          }
        </div>
      </>
  );
}

const StyledButton = styled(Button)`
  background-color: lightgray;
  &.active {
    background-color: ${props => props.theme.main};
  }
`;

/**
 * premise condition: 키보드 입력을 한글모드로 변경한 다음,
 *
 * Case1
 * 2. document.activeElement === document.body인 상태에서
 * 3. 한글을 입력할 경우
 * result: ㅁ을 입력해도 로그에 'a'로 찍힌다.
 *
 * Case2
 * 2. document.activeElement === Input인 상태에서
 * 3. 한글을 입력할 경우
 * result: ㅁ을 입력하면 로그에 'Process'로 찍힌다.
 */
function WindowKeyDownTest() {
  const [value, setValue] = useState('');
  
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      console.log(event.key);
    };
  
    window.addEventListener('keydown', handler);
  
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
  
  return (
      <Input value={value} onChangeText={setValue}/>
  );
}

function WindowKeyDownFocusToInput() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      console.log('window keydown event key', event.key, event.key.length);
      
      if (isKeyCanBeEnteredInWindow(event)) {
        inputRef.current?.focus();
        event.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handler);
    
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
  
  return (
      <Input ref={inputRef} value={value} onChangeText={setValue}/>
  );
}

const Input = styled(InputText)`
  padding: 10px;
  border: 3px solid black;
`;
