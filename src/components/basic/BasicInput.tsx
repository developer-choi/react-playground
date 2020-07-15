import React, {InputHTMLAttributes} from 'react';
import styled from 'styled-components';

const BasicInputStyle = styled.input`
    border: 1px solid ${props => props.theme.lightPointColor};
    padding: 10px 20px;
    border-radius: 5px;
`;

export default function BasicInput(props: InputHTMLAttributes<HTMLInputElement>) {

  return (
      <BasicInputStyle {...props}/>
  );
}
