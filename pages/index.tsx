import React, {useState} from 'react';
import styled from 'styled-components';
import InputIncomputableNumber from '@components/extend/InputIncomputableNumber';

export default function Page() {
  const [number, setNumber] = useState('');
  return (
      <Wrap>
        <InputIncomputableNumber value={number} onChangeText={setNumber} enableMask/>
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
