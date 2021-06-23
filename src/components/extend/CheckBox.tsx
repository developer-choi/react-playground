import React, {ChangeEvent, ComponentProps} from 'react';

export interface CheckBoxProps extends Omit<ComponentProps<'input'>, 'ref' | 'type'> {
  onChangeChecked?: (checked: boolean) => void;
}

export default function CheckBox({onChangeChecked, onChange, ...rest}: CheckBoxProps) {
  
  const _onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked?.(event.target.checked);
    onChange?.(event);
  }, [onChangeChecked, onChange]);
  
  return (
      <input type="checkbox" onChange={_onChange} {...rest}/>
  );
}
