import React, {ChangeEvent, useCallback, useState} from 'react';

export default function Page() {
  const [date, setDate] = useState('');
  
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    alert(event.target.value);
    setDate(event.target.value);
  }, []);
  
  return (
      <div>
        <input type="date" value={date} onChange={onChange}/>
      </div>
  );
}
