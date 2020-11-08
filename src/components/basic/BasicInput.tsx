import React, {forwardRef, Ref} from 'react';
import styled from 'styled-components';
import InputExtend, {InputExtendProp} from '../extend/InputExtend';

export default forwardRef(function BasicInput(props: InputExtendProp, ref: Ref<HTMLInputElement>) {

  return (
      <BasicInputStyle ref={ref} {...props}/>
  );
});

const BasicInputStyle = styled(InputExtend)`
    border: 1px solid ${props => props.theme.lightPointColor};
    padding: 10px 20px;
    border-radius: 5px;
`;
