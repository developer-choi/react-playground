import React from 'react';
import SendSvg from '@components/atom/svg/SendSvg';
import { Button } from '@components/atom/button/button-presets';
import styled from 'styled-components';

export default function Page() {
  
  const [active, setActive] = React.useState(false);
  
  const toggle = React.useCallback(() => {
    setActive(prevState => !prevState);
  }, []);
  
  return (
      <div>
        <SendTransition className={active ? 'active' : ''}/>
        <Button onClick={toggle}>Toggle</Button>
      </div>
  );
};

const SendTransition = styled(SendSvg)`
  path {
    fill: gray;
    transition: fill 1s;
  }
  
  &.active path {
    fill: red;
  }
`;
