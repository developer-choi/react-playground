import React, {useCallback, useRef} from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const MISSIONS = new Array(3).fill('').map((value, index) => `${index + 1}th misson`);

export default function MultiInputFocusPage() {
  
  const inputsRef = useRef<HTMLInputElement[]>([]);
  
  const save = useCallback(() => {
    const emptyElement = inputsRef.current?.find(element => element.value === '');
    if (emptyElement) {
      alert('Please input a mission');
      emptyElement.focus();
      return;
    }
  
    alert('save success');
  }, []);
  
  return (
      <>
        <Head>
          <title>multi-input-focus</title>
        </Head>
        <InputsWrap>
          {MISSIONS.map((value, index) => (
              <Input key={index}
                     ref={element => {
                       if (inputsRef.current && element) {
                         inputsRef.current[index] = element;
                       }
                     }}
              />
          ))}
          <button onClick={save} type="button">Save</button>
        </InputsWrap>
      </>
  );
}

const InputsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  :not(:last-child) {
    margin-bottom: 10px;
  }
  padding: 5px;
  border: 2px solid lightgray;
  :hover {
    border-color: dodgerblue;
  }
`;
