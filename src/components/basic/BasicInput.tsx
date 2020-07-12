import React, {InputHTMLAttributes} from 'react';
import styled from 'styled-components';
import {POINT_COLOR} from '../color';

const BasicInputStyle = styled.input`
    border: 1px solid ${POINT_COLOR};
    padding: 10px 20px;
    border-radius: 5px;
`;

export default function BasicInput(props: InputHTMLAttributes<HTMLInputElement>) {

  return (
      <BasicInputStyle {...props}/>
  );
}
