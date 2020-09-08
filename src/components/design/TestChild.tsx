import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export interface TestChildProp extends ComponentProps<'div'> {

}

export default function TestChild({style, ...rest}: TestChildProp) {

  return (
      <TestChildStyle style={{...style}} {...rest}/>
  );
}

const TestChildStyle = styled.div`
`;
