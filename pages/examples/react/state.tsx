import {useCallback, useEffect, useState} from 'react';

export default function Page() {
  const [num, setNum] = useState(0);
  const [str, setStr] = useState('');
  
  const updateState = useCallback(() => {
    //State updates may be asynchronous
    console.log('Before update num', num);
    setNum(prevState => prevState + 1);
    console.log('After update num', num);
  
    //React may batch multiple setState() calls into a single update for performance.
    setStr(prevState => prevState + 1);
    
  }, [num]);
  
  useEffect(() => {
    console.log(num, str);
  });
  
  return (
    <div>
      <button onClick={updateState}>state 바꾸기</button>
    </div>
  );
}
