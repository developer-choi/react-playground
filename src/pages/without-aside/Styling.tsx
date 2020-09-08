import React, {ComponentProps} from 'react';
import styled from 'styled-components';

export default function Styling() {

  return (
      <div style={{backgroundColor: 'purple'}}>
        <Child style={{backgroundColor: 'red'}}>
          Child를 style prop으로 스타일링
        </Child>
        <ChildStyle>
          Child를
        </ChildStyle>
      </div>
  );
}

const ChildStyle = styled(Child)`
  background-color: green;
`;

interface ChildProp extends ComponentProps<'div'> {

}

function Child({...rest}: ChildProp) {

  return (
      <div {...rest}/>
  )
}
