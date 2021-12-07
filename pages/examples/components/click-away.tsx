import React from 'react';
import ClickAwayListener from '@component/atom/ClickAwayListener';
import { Button } from '@component/atom/button/button-presets';
import useToggle from '@util/custom-hooks/useToggle';
import styled from 'styled-components';

export default function Page() {
  const {value: visible, setFalse: close, toggle} = useToggle(false);
  
  return (
    <Wrap>
      <ClickAwayListener onClickAway={close}>
        <Button onClick={toggle}>Click Me</Button>
        {visible &&
        <Tooltip>
          Hello World
        </Tooltip>
        }
      </ClickAwayListener>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
`;

const Tooltip = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px 30px;
`;
