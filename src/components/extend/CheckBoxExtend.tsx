import React, {ChangeEvent, ComponentProps, forwardRef, Ref} from 'react';

export interface CheckBoxExtendProps extends Omit<ComponentProps<'input'>, 'ref' | 'type'> {
  onChangeChecked?: (checked: boolean) => void;
}

export default forwardRef(function CheckBoxExtend({onChangeChecked, onChange, ...rest}: CheckBoxExtendProps, ref: Ref<HTMLInputElement>) {
  
  const _onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked?.(event.target.checked);
    onChange?.(event);
  }, [onChangeChecked, onChange]);
  
  return (
      <input ref={ref} type="checkbox" onChange={_onChange} {...rest}/>
  );
});
