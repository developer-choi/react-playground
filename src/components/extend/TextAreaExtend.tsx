import React, {ChangeEvent, ComponentProps, forwardRef, Ref, useCallback} from 'react';

export interface TextAreaExtendProp extends Omit<ComponentProps<'textarea'>, 'ref'> {
  onChangeText?: (value: string) => void;
}

export default forwardRef(function TextAreaExtend({onChange, onChangeText, ...rest}: TextAreaExtendProp, ref: Ref<HTMLTextAreaElement>) {

  const needNotOnChange = onChange === undefined && onChangeText === undefined;

  const _onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText?.(event.target.value);
    onChange?.(event);
  }, [onChange, onChangeText]);

  return (
      <textarea ref={ref} onChange={needNotOnChange ? undefined : _onChange} {...rest}/>
  );
});
