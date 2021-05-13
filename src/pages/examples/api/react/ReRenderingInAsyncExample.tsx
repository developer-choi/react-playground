import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import ButtonExtend from '@components/atom/ButtonExtend';

export default function ReRenderingInAsyncExample() {

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [bool, setBool] = useState(false);

  const onClick = useCallback(() => {

    setBool(prevState => !prevState);

  }, []);

  const setState = useCallback(() => {
    console.log('setCount1 call');
    setCount1(prevState => prevState + 1);
    console.log('setCount2 call');
    setCount2(prevState => prevState + 2);
    console.log('setCount3 call');
    setCount3(prevState => prevState + 3);
  }, []);

  console.log('parent-re-render', count1, count2, count3, bool);

  return (
      <div>
        <div>
          <StyledButton onClick={onClick}>부모 state 바꾸기</StyledButton>
          <Child bool={bool} setState={setState}/>
        </div>
      </div>
  );
}

function Child({bool, setState}: {bool: boolean, setState: Function}) {

  useEffect(() => {
    setState();
  }, [setState, bool]);

  return (<></>);
}

/**
 * event listener로 시작됐으면서 비동기(setTimeout등) 안에서 setState를 call하지않은 케이스에서는 비동기 + 일괄처리
 * event listener로 시작됐고, 부모 useEffect안에서 비동기안에서 setState를 call하지 않은 케이스에서도 비동기 + 일괄처리
 * 바로 위 얘제처럼 자식 useEffect에서도 해봐도 역시나 비동기 + 일괄처리. setTimeout같은 비동기 요소가 중간에 있어야 동기 + 즉시처리
 * 이거말고도 동기 + 즉시처리되는 예시가있는지는 모르겠음.
 *
 * useEffect의 effect도 비동기로 실행되지만, 대체로 setTimeout, http call 말고는 비동기 + 일괄처리가 되는듯 하다.
 */

const StyledButton = styled(ButtonExtend)`
  background-color: red;
  color: white;
  padding: 10px;
`;
