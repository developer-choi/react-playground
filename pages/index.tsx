import React, {useState} from 'react';
import styled from 'styled-components';
import InputNumber from '@components/extend/InputNumber';

export default function Page() {
  const [number, setNumber] = useState('');
  const [negative, setNegative] = useState('');
  return (
      <Wrap>
        <InputNumber value={number} onChangeText={setNumber}/>
        <InputNumber value={negative} onChangeText={setNegative} enableComma enableNegative maxIntegerLength={7} maxDecimalLength={7}/>
      </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  
  > input {
    border: 1px solid black;
    padding: 5px;
    width: 200px;
    
    :not(:first-child) {
      margin-top: 20px;
    }
  }
`;
