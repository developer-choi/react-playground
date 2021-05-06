import React from 'react';
import {SystemDatePicker} from '@components/atom/SystemDatePicker';
import styled from 'styled-components';

export default function Page() {
  
  const [date, setDate] = React.useState(new Date());
  
  return (
      <SystemDatePicker value={date} onChangeDate={setDate}>
        <Button>Button</Button>
      </SystemDatePicker>
  );
};

const Button = styled.button`
  background: lightcoral;
  padding: 8px 20px;
  border-radius: 5px;
  color: white;
`;
