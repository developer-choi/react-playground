import React, {ComponentProps, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';
import {defaultMaxLengthPlaceholder, useCustomOnChange} from '@component/extend/InputText';
import {isMatchKeyboardEvent} from '@util/extend/keyboard-event';

export interface TextAreaProp extends ComponentProps<'textarea'> {
  onChangeText?: (value: string) => void;
  onCtrlEnter?: (event: KeyboardEvent) => void;
}

export default forwardRef(function TextArea(props: TextAreaProp, ref: Ref<HTMLTextAreaElement>) {
  const {onKeyDown, onChangeText, onChange, onCtrlEnter, maxLength = 100000, placeholder, ...rest} = props;
  
  const customOnChange = useCustomOnChange({onChange, onChangeText, maxLength});
  
  const customOnKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isMatchKeyboardEvent(event, {key: 'Enter', matchKeys: ['ctrlKey']})) {
      onCtrlEnter?.(event);
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
