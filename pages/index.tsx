import React, {useState} from 'react';
import styled from 'styled-components';
import InputComputableNumber from '@components/extend/InputComputableNumber';

export default function Page() {
  const [value, setValue] = useState('');
  console.log(value);
  return (
      <Wrap>
        <InputComputableNumber enableComma maxDecimalLength={10} maxIntegerLength={8} value={value} onChangeText={setValue}/>
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
