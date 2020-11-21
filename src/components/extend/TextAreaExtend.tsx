import React, {ChangeEvent, ComponentProps, forwardRef, Ref, useCallback} from 'react';
import {getResultCallback} from '../../utils/form';

export interface TextAreaExtendProp extends Omit<ComponentProps<'textarea'>, 'ref'> {
  onChangeText?: (value: string) => void;
}

export default forwardRef(function TextAreaExtend({onChange, onChangeText, ...rest}: TextAreaExtendProp, ref: Ref<HTMLTextAreaElement>) {

  const customOnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText?.(event.target.value);
    onChange?.(event);
  }, [onChange, onChangeText]);

  const _onChange = getResultCallback(onChange, customOnChange, [onChangeText]);

  return (
      <textarea ref={ref} onChange={_onChange} {...rest}/>
  );
});
