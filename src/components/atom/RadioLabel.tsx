import React, {ChangeEvent, ComponentProps, useCallback, useContext} from 'react';
import {RadioGroupContext} from '@components/atom/RadioGroup';
import styled from 'styled-components';
import {myClassName} from '../../utils/libraries/classnames';

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
      <Label className={myClassName({checked: disabled ? false : checked, disabled}, className)} {...labelProps}>
        <input type="radio" value={value} onChange={_onChange} name={name} checked={checked}/>
        {label ? label : value}
      </Label>
  );
}

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  
  &.disabled {
    /**
     * 이 스타일을 적용한 근거 : https://developer.mozilla.org/ko/docs/Web/CSS/:disabled
     * CSS :disabled 의사 클래스는 모든 비활성 요소를 나타냅니다. 비활성 요소란 활성(선택, 클릭, 입력 등등)하거나 포커스를 받을 수 없는 요소를 말합니다. 반대 상태인 활성 요소도 존재합니다.
     */
    pointer-events: none;
  }
`;
