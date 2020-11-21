import React, {ChangeEvent, FormEvent, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';
import {DEFAULT_INPUT_PROPS, InputExtendProp, getResultCallback} from './input-extend';

export default forwardRef(function InputExtend(props: InputExtendProp, ref: Ref<HTMLInputElement>) {

  const {onKeyUp, toLowerCase, maxLength, onCtrlV, onTab, onEnter, onChangeText, onChange, onKeyDown, ...rest} = {...DEFAULT_INPUT_PROPS, ...props};

  const customOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

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

  const customOnKeyUp = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    if (onCtrlV && event.ctrlKey && event.key.toLowerCase() === 'v') {
      //@ts-ignore
      onCtrlV(event.target.value);
      return;
    }

    onKeyUp?.(event);

  }, [onKeyUp, onCtrlV]);

  const customOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    const {value} = event.target;
    const truncatedValue = value.slice(0, maxLength);

    onChangeText?.(toLowerCase ? truncatedValue.toLowerCase() : truncatedValue);
    onChange?.(event);
  }, [maxLength, onChange, toLowerCase, onChangeText]);

  const onInvalid = useCallback((event: FormEvent<HTMLInputElement>) => {
    //invalid event때문에 type email했을 때 'as'만 입력하고 엔터치면 system alert이 발생했던 것. 이것은 form의 submit 이벤트를 prevent한다고 사라지지않음.
    event.preventDefault();
  }, []);

  const _onKeyDown = getResultCallback(onKeyDown, customOnKeyDown, [onEnter, onCtrlV]);
  const _onKeyUp = getResultCallback(onKeyUp, customOnKeyUp, [onCtrlV]);
  const _onChange = getResultCallback(onChange, customOnChange, [onChangeText]);

  return (
      <input ref={ref} onInvalid={onInvalid} onKeyUp={_onKeyUp} onChange={_onChange} onKeyDown={_onKeyDown} {...rest}/>
  );
});
