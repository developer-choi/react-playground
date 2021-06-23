import React, {ChangeEvent, ComponentProps, useCallback} from 'react';

export interface RadioProps extends Omit<ComponentProps<'input'>, 'ref' | 'type'> {
  onChangeChecked?: (checked: boolean) => void
}

export default function Radio({onChangeChecked, onChange, ...rest}: RadioProps) {
  
  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked?.(event.target.checked);
    onChange?.(event);
  }, [onChange, onChangeChecked]);
  
  return (
      <input type="radio" onChange={_onChange} {...rest}/>
  );
};
