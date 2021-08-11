import React, {ChangeEvent, ComponentProps, ComponentType, useCallback} from 'react';
import styled from 'styled-components';
import {myClassName} from '../../utils/libraries/classnames';

export interface CheckBoxLabelLeftProps {
  checked: boolean;
  disabled?: boolean;
}

export interface CheckBoxProps extends Omit<ComponentProps<'label'>, 'ref'>, Pick<ComponentProps<'input'>, 'disabled' | 'checked'> {
  onChangeChecked: (checked: boolean) => void;
  label: string;
  checked: boolean;
  labelLeft?: ComponentType<CheckBoxLabelLeftProps>;
}

export default function CheckBox({onChangeChecked, label, checked, className, disabled, labelLeft: LabelLeft, ...rest}: CheckBoxProps) {
  
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked(event.target.checked);
  }, [onChangeChecked]);
  
  return (
      <Label className={myClassName({checked: disabled ? false : checked, disabled}, className)} {...rest}>
        {LabelLeft && <LabelLeft checked={checked} disabled={disabled}/>}
        <input type="checkbox" onChange={onChange} checked={checked} disabled={disabled}/>
        {label}
      </Label>
  );
}

const Label = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
`;
