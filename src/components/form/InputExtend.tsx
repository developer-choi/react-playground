import React, {ChangeEvent, ComponentProps, KeyboardEvent, useCallback} from 'react';

export interface InputExtendProp extends Omit<ComponentProps<'input'>, 'ref'> {
  onTab?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeText?: (value: string) => void;
}

export default function InputExtend({onTab, onEnter, onChangeText, onChange, onKeyDown, ...rest}: InputExtendProp) {

  const needNotOnKeyDown = onKeyDown === undefined && onTab === undefined && onEnter === undefined;

  const _onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    switch (event.key) {
      case 'Enter':
        onEnter?.(event);
        break;

      case 'Tab':
        onTab?.(event);
        break;
    }

    onKeyDown?.(event);

  }, [onKeyDown, onTab, onEnter]);

  const needNotOnChange = onChange === undefined && onChangeText === undefined;

  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeText?.(event.target.value);
    onChange?.(event);
  }, [onChange, onChangeText]);

  return (
      <input onChange={needNotOnChange ? undefined : _onChange} onKeyDown={needNotOnKeyDown ? undefined : _onKeyDown} {...rest}/>
  );
}
