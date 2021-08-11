import React, {useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import InputText from '@components/extend/InputText';
import {Button} from '@components/atom/button/button-presets';
import useToggleSetState from '../../../src/utils/custom-hooks/useToggleSetState';

export default function WindowKeyDownPage() {
  const [enableFocusToInput, setEnableFocusToInput] = useState(false);
  const toggle = useToggleSetState(setEnableFocusToInput);
  
  return (
      <>
        <Head>
          <title>window-input</title>
        </Head>
        <div>
          <StyledButton className={enableFocusToInput ? 'active' : ''} onClick={toggle}>입력시 포커스이동 활성화</StyledButton>
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
  
  React.useEffect(() => {
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      console.log('window keydown event key', event.key, event.key.length);
      
      if (document.activeElement === document.body && isKeyCanBeEntered(event)) {
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

/**
 * 반드시 window.addEventListener('keydown', handler)의 handler에 arguments로 전달되는 event에서만 작동됨.
 * F5나 Delete키 같이 <input>에 입력되지않는 기능 관련 키와, 1 2 3 a b c 처럼 <input>에 입력이 가능한 키를 구분하기위한 함수.
 */
function isKeyCanBeEntered(windowKeyDownEvent: KeyboardEvent) {
  const {key, ctrlKey, altKey, metaKey, shiftKey} = windowKeyDownEvent;
  
  if (ctrlKey || altKey || metaKey || shiftKey) {
    return false;
  }
  
  /**
   * 'Enter', 'ArrowUp' 같은 특수키는 꼭 길이가 1보다 컸고, 'ㅁ'같은 한글은 포커스가 document.body에 있을 때 입력할 경우 'a'로 입력이 됬었음.
   * 그러므로 길이가 1인걸로 체크하는것으로 결정했습니다.
   */
  return key.length === 1;
}

const Input = styled(InputText)`
  padding: 10px;
  border: 3px solid black;
`;
