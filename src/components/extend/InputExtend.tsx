import React, {ChangeEvent, FormEvent, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';
import {DEFAULT_INPUT_PROPS, InputExtendProp} from './input-extend';

export default forwardRef(function InputExtend(props: InputExtendProp, ref: Ref<HTMLInputElement>) {

  const {toLowerCase, maxLength, onCtrlV, onTab, onEnter, onChangeText, onChange, onKeyDown, ...rest} = {...DEFAULT_INPUT_PROPS, ...props};

  const needNotOnKeyDown = [onEnter, onKeyDown, onCtrlV].every(callback => callback === undefined);
  const needNotOnKeyUp = [onCtrlV].every(callback => callback === undefined);

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

  const _onKeyUp = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    if (onCtrlV && event.ctrlKey && event.key.toLowerCase() === 'v') {
      //@ts-ignore
      onCtrlV(event.target.value);
      return;
    }

  }, [onCtrlV]);

  const needNotOnChange = onChange === undefined && onChangeText === undefined;

  const _onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    const {value} = event.target;
    const truncatedValue = value.slice(0, maxLength);

    onChangeText?.(toLowerCase ? truncatedValue.toLowerCase() : truncatedValue);
    onChange?.(event);
  }, [maxLength, onChange, toLowerCase, onChangeText]);

  const onInvalid = useCallback((event: FormEvent<HTMLInputElement>) => {
    //invalid event때문에 type email했을 때 'as'만 입력하고 엔터치면 system alert이 발생했던 것. 이것은 form의 submit 이벤트를 prevent한다고 사라지지않음.
    event.preventDefault();
  }, []);

  return (
      <input ref={ref} onInvalid={onInvalid} onKeyUp={needNotOnKeyUp ? undefined : _onKeyUp} onChange={needNotOnChange ? undefined : _onChange} onKeyDown={needNotOnKeyDown ? undefined : _onKeyDown} {...rest}/>
  );
});
