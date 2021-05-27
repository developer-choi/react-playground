import React, {ChangeEvent, useCallback, useState} from 'react';

export default function Page() {
  const [date, setDate] = useState('');
  
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    alert(event.target.value);
    setDate(event.target.value);
  }, []);
  
  return (
      <div>
        <input style={{width: 100, height: 100, backgroundColor: 'red'}} type="date" value={date} onChange={onChange}/>
      </div>
  );
}
