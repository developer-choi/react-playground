import { Button } from '@component/atom/button/button-presets';
import React, { useCallback, useState } from 'react';
import useLoggingMount from '@util/custom-hooks/useLoggingMount';

export default function MountPage() {
  const [bool, setBool] = useState(false);
  
  const toggle = useCallback(() => {
    setBool(prevState => !prevState);
  }, []);
  
  return (
    <>
      <Button className={bool ? 'gray' : ''} onClick={toggle}>토글</Button>
      {bool ?
        <ComponentA/>
        // 실제로 ComponentA와 Component B에서 실제로 렌더링되는 컴포넌트는 같다 하더라도, 이 경우 ComponentA 하위의 모든 컴포넌트는 전부 언마운트됬다가 마운트되었다가 한다.
        :
        <ComponentB/>
      }
      {bool ?
        <ActualComponent message="Actual Component A"/>
        :
        <ActualComponent message="Actual Component B"/>
      }
    </>
  );
}

function ComponentA() {
  useLoggingMount('ComponentA');
  return <ActualComponent message="Component A"/>
}

function ComponentB() {
  useLoggingMount('ComponentB');
  return <ActualComponent message="Component B"/>
}

function ActualComponent({ message }: { message: string; }) {
  return (
    <div>{message}</div>
  );
}
