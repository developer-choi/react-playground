import React, {useState} from 'react';
import RadioGroup from '@components/atom/RadioGroup';
import RadioLabel from '@components/atom/RadioLabel';
import styled from 'styled-components';
import Form from '@components/extend/Form';

export default function Page() {
  
  const [gender, setGender] = useState('man');
  
  return (
      <RadioWrap>
        <RadioGroup name="gender" value={gender} onChange={setGender}>
          <CustomRadio value="man"/>
          <CustomRadio value="women"/>
        </RadioGroup>
      </RadioWrap>
  );
}

const RadioWrap = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const CustomRadio = styled(RadioLabel)`
  input {
    //display: none; display none 혹은 visibility hidden같은것을 하면, focus를 못받는다. 그래서 이렇게 라디오버튼부분만 숨기고 label에 focus-within으로 포커싱을 구현한다.
    appearance: none;
  }
  
  min-width: 100px;
  justify-content: center;
  
  padding: 5px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  
  &:focus-within {
    border-color: black;
  }
  
  &.checked {
    background-color: red;
    color: white;
  }
  
  &:not(:first-child) {
    margin-top: 10px;
  }
`;
