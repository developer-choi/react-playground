import React, {ChangeEvent, ComponentProps, Dispatch, KeyboardEvent, SetStateAction, useCallback} from 'react';

export interface BasicInputProp extends Omit<ComponentProps<'input'>, 'ref' | 'onKeyDown' | 'onChange'> {
  onTab?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeValue: Dispatch<SetStateAction<string>>;
  value: string;
}

export default function BasicInput({onTab, onEnter, onChangeValue, ...rest}: BasicInputProp) {

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    if (onTab === undefined && onEnter === undefined) {
      return;
    }

    switch (event.key) {
      case 'Enter':
        onEnter?.(event);
        return;

      case 'Tab':
        onTab?.(event);
        return;
    }

  }, [onTab, onEnter]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(event.target.value);
  }, [onChangeValue]);

  return (
      <input onChange={onChange} onKeyDown={onKeyDown} {...rest}/>
  );
}
