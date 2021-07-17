import React, {ComponentProps, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';
import {defaultMaxLengthPlaceholder, useCustomOnChange} from '@components/extend/InputText';

export interface TextAreaProp extends ComponentProps<'textarea'> {
  onChangeText?: (value: string) => void;
  onCtrlEnter?: () => void;
}

export default forwardRef(function TextAreaExtend(props: TextAreaProp, ref: Ref<HTMLTextAreaElement>) {
  const {onKeyDown, onChangeText, onChange, onCtrlEnter, maxLength = 100000, placeholder, ...rest} = props;
  
  const customOnChange = useCustomOnChange({onChange, onChangeText, maxLength});
  
  const customOnKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      onCtrlEnter?.();
    }
    
    onKeyDown?.(event);
  }, [onKeyDown, onCtrlEnter]);
  
  const _placeholder = defaultMaxLengthPlaceholder(maxLength, placeholder);
  
  return (
      <textarea
          ref={ref}
          onChange={customOnChange}
          onKeyDown={customOnKeyDown}
          placeholder={_placeholder}
          {...rest}
      />
  );
});
