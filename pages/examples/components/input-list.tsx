import React, {useState} from 'react';
import InputList from '@component/molecules/InputList';
import styled from 'styled-components';

export default function Page() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <Wrap>
      <InputList list={values} onChangeList={setValues} autoFocus/>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 15px;
`;
