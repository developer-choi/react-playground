import React, {ChangeEvent, useCallback, useState} from 'react';

export default function Page() {
  const [date, setDate] = useState('');
  
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  }, []);
  
  return (
      <div>
        <input style={{width: 100, height: 100, backgroundColor: 'red'}} type="date" value={date} onChange={onChange}/>
        <br/>
        result={date}
        <br/>
        typeof={typeof date}
      </div>
  );
}
