import React from 'react';
import {SystemDatePicker} from '@components/atom/SystemDatePicker';

export default function Page() {
  
  const [date, setDate] = React.useState(new Date());
  
  return (
      <SystemDatePicker maxDate={new Date('2021-06-01')} minDate={new Date('2021-05-01')} value={date} onChangeDate={setDate}>
        <img src="/images/calendar.png" alt="calendar icon"/>
      </SystemDatePicker>
  );
};
