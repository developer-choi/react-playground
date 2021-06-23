import React, {ChangeEvent, ComponentProps, useCallback, useContext} from 'react';
import {RadioGroupContext} from '@components/atom/RadioGroup';
import classNames from 'classnames';
import styled from 'styled-components';

export interface RadioProps extends Omit<ComponentProps<'input'>, 'type' | 'onChange' | 'name' | 'checked'>{
  value: string;
  label?: string;
  labelClassName?: string;
}

export default function Radio({value, label, labelClassName, ...inputProps}: RadioProps) {
  
  const {onChange, name, value: parentValue} = useContext(RadioGroupContext);
  
  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);
  
  const checked = parentValue === value;
  
  return (
      <Label className={classNames({checked}, labelClassName)}>
        <input type="radio" value={value} onChange={_onChange} name={name} checked={checked} {...inputProps}/>
        {label ? label : value}
      </Label>
  );
}

const Label = styled.label`
  display: inline-flex;
  align-items: center;
`;
