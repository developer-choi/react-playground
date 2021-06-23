import React, {ChangeEvent, useCallback, useContext} from 'react';
import {RadioGroupContext} from '@components/extend/RadioGroup';

export interface RadioProps<T extends string> {
  value: T;
}

export default function Radio<T extends string>({value}: RadioProps<T>) {
  
  const {onChange, name, value: parentValue} = useContext(RadioGroupContext);
  
  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);
  
  return (
      <input type="radio" value={value} onChange={_onChange} name={name} checked={parentValue === value}/>
  );
}
