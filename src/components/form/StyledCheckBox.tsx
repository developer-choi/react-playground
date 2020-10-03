import React, {ChangeEvent, useCallback, useState} from 'react';
import styled from 'styled-components';
import BasicCheckBox, {BasicCheckBoxProp} from './BasicCheckBox';

export default function StyledCheckBox(props: BasicCheckBoxProp) {

  return <Styled {...props}/>;
}

const Styled = styled(BasicCheckBox)`
    
`;

function Example() {
  const [likeCoding, setLikeCoding] = useState<'' | 'coding'>('');

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {value, checked} = event.target;

    if (checked) {
      //@ts-ignore
      setLikeCoding(value);

    } else {
      setLikeCoding('');
    }

  }, []);

  return (
      <StyledCheckBox label="코딩좋아해?" value="coding" currentValue={likeCoding} onChange={onChangeHandler}/>
  );
}
