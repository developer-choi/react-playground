import React, {ChangeEvent, MouseEvent, useCallback, useState} from 'react';
import styled from 'styled-components';

export default function Page() {
  const [checked, setChecked] = useState(false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log('onChange() call', event.target.checked);
    setChecked(event.target.checked);
  }, []);

  const onClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
    console.log('Prevent event in onClick()');
    event.preventDefault();
  }, []);

  console.log('state', checked);

  return (
    <StyledInput type="checkbox" onChange={onChange} checked={checked} onClick={onClick}/>
  );
}

const StyledInput = styled.input`
  width: 40px;
  height: 40px;
`;
