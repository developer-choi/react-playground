import React, {forwardRef, Ref, useCallback, useImperativeHandle, useRef} from 'react';
import styled from 'styled-components';

export default function UseImperativeExample() {
  
  const childRef = useRef<ChildMethod>(null);
  
  const onClick = useCallback(() => {
    childRef.current?.customFocus();
  }, []);
  
  return (
      <Wrap>
        <button onClick={onClick}>CLICK ME</button>
        <Child ref={childRef}/>
      </Wrap>
  );
}

const Wrap = styled.div`
  button {
    padding: 10px;
    border-radius: 5px;
    background-color: lightcoral;
    color: whitesmoke;
  }
  
  input {
    border: 1px solid black;
    padding: 5px;
  }
`;


interface ChildMethod {
  customFocus: () => void;
}

const Child = forwardRef(function Child(props: {}, ref: Ref<ChildMethod>) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    customFocus: () => {
      inputRef.current?.focus();
    }
  }));
  
  return (
      <input ref={inputRef}/>
  );
});
