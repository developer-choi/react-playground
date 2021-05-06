import React, {PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';

export default function Page() {
  
  return (
      <>
        <CalendarButton>
          <CustomButton>버튼</CustomButton>
        </CalendarButton>
        <CalendarButton>
          <img src="/calendar.svg" alt=""/>
        </CalendarButton>
      </>
  );
};

function CalendarButton({children}: PropsWithChildren<{}>) {
  return (
      <Label>
        {children}
        <Input type="date"/>
      </Label>
  );
}

const Label = styled.label`
  position: relative;
  display: inline-flex;
`;

const absoluteFull = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  font-size: 0;
  ${absoluteFull};
  
  input[type="date"]::-webkit-calendar-picker-indicator {
    ${absoluteFull};
    margin: 0;
    background-image: none;
  }
  input[type="date"]::-webkit-inner-spin-button {
    display: none;
  }
`;

const CustomButton = styled.button`
  background: red;
  width: 100px;
  height: 50px;
  color: white;
`;
