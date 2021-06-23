import React, {ChangeEvent, ComponentProps, useCallback, useContext} from 'react';
import {RadioGroupContext} from '@components/atom/RadioGroup';
import classNames from 'classnames';
import styled from 'styled-components';

export interface RadioLabelProps extends Omit<ComponentProps<'label'>, 'ref'>, Pick<ComponentProps<'input'>, 'disabled'> {
  value: string;
  label?: string;
}

export default function RadioLabel({value, label, disabled, className, ...labelProps}: RadioLabelProps) {
  
  const {onChange, name, value: parentValue} = useContext(RadioGroupContext);
  
  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);
  
  const checked = parentValue === value;
  
  return (
      <Label className={classNames({checked}, className)} {...labelProps}>
        <input type="radio" value={value} onChange={_onChange} name={name} checked={checked}/>
        {label ? label : value}
      </Label>
  );
}

const Label = styled.label`
  display: inline-flex;
  align-items: center;
`;
