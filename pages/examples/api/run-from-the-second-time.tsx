import React, {useCallback, useState} from 'react';
import {useEffectFromTheSecondTime} from '@util/custom-hooks/useEffectFromTheSecondTime';
import {useForceReRender} from '@util/custom-hooks/useForceReRender';
import Button from '@component/atom/button/Button';

export default function Page() {
  const [number, setNumber] = useState(0);
  
  useEffectFromTheSecondTime(() => {
    console.log('This effect is run every render', number);
  });
  
  useEffectFromTheSecondTime(useCallback(() => {
    console.log('This effect is run when the number is changed', number);
  }, [number]));
  
  const increase = useCallback(() => {
    setNumber(prevState => prevState + 1);
  }, []);
  
  const forceReRender = useForceReRender();
  
  return (
    <div>
      <Button onClick={increase}>Change number</Button>
      <Button onClick={forceReRender}>Force render</Button>
    </div>
  );
}
