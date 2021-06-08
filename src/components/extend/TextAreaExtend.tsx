import React, {ChangeEvent, ComponentProps, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';

export interface TextAreaExtendProp extends ComponentProps<'textarea'> {
  onChangeText: (value: string) => void;
  onCtrlEnter: () => void;
}

export default forwardRef(function TextAreaExtend({onKeyDown, onChangeText, onChange, onCtrlEnter, ...rest}: TextAreaExtendProp, ref: Ref<HTMLTextAreaElement>) {
  
  const _onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText?.(event.target.value);
    onChange?.(event);
  }, [onChangeText, onChange]);
  
  const _onKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      onCtrlEnter();
    }
    
    onKeyDown?.(event);
  }, [onKeyDown, onCtrlEnter]);
  
  return (
      <textarea ref={ref} onChange={_onChange} onKeyDown={_onKeyDown} {...rest}/>
  );
});
