import React, {ChangeEvent, useCallback, useState} from 'react';
import styled from 'styled-components';
import MenuItem from '../../material-ui/src/MenuItem';
import Select from '../../material-ui/src/Select';

export default function Home() {

  const [age, setAge] = useState(10);

  const onChangeAge = useCallback((event: ChangeEvent<{ value: number }>) => {
    setAge(event.target.value);
  }, []);

  return (
      <HomeStyle>
        <Select value={age} onChange={onChangeAge as any}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </HomeStyle>
  );
}

const HomeStyle = styled.div`
  padding: 30px;
`;
