import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import BasicInput from '../../components/basic/BasicInput';
import {FlexCenter, FlexDirectionColumn} from '../../utils/style/css';
import {writeText} from 'clipboard-polyfill';
import {asyncAlert} from '../../utils/alert';

export default function Home() {

  const [prev, setPrev] = useState('');
  const [current, setCurrent] = useState('');

  const prevRef = useRef<HTMLInputElement>(null);
  const currentRef = useRef<HTMLInputElement>(null);

  const onPrevInput = useCallback(() => {
    currentRef.current?.focus();
  }, []);

  const onCurrentInput = () => {
    console.log(current);
    const result = calculate(prev, current);
    writeText(`${result}`).then();
    asyncAlert(`${result} copied`);
    prevRef.current?.focus();
    setPrev('');
    setCurrent('');
  };

  return (
      <HomeStyle>
        <Form>
          <Label>이전값</Label>
          <BasicInput autoFocus ref={prevRef} value={prev} onChangeText={setPrev} onCtrlV={onPrevInput}/>

          <Label>현재값</Label>
          <BasicInput ref={currentRef} value={current} onChangeText={setCurrent} onCtrlV={onCurrentInput}/>
        </Form>
      </HomeStyle>
  );
}

function calculate(prev: string, current: string) {

  const _prev = Number(prev);
  const _current = Number(current);
  return ((_current - _prev) * 100 / _prev).toFixed(2) + '%';
}

const HomeStyle = styled.div`
  ${FlexCenter};
  padding-top: 50px;
`;

const Form = styled.div`
  ${FlexDirectionColumn};
  width: 600px;
`;

const Label = styled.label`
  margin-top: 20px;
  margin-bottom: 5px;
`;
