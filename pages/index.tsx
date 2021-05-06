import React from 'react';
import {SystemDatePicker} from '@components/atom/SystemDatePicker';

export default function Page() {
  
  const [date, setDate] = React.useState(new Date());
  
  return (
      <SystemDatePicker value={date} onChangeDate={setDate}>
        <img src="/images/calendar.png" alt="calendar icon"/>
      </SystemDatePicker>
  );
};
