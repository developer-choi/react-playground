import React, {ChangeEvent, FormEvent, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';
import {DEFAULT_INPUT_PROPS, InputExtendProp} from './input-extend';

/**
 * Capslock 눌렀을 때 알려주는거 보여주는 기능 필요.
 * onCapslock callback만들고.. 음..언제 호출되는걸로 할까?
 * type number는 기본적으로 - 입력못하게 막기. 이걸 replaceList Prop으로 해결해볼까? 음 아님 "replaceList"는 이 기능에 대해 직관적이지못함. blackList도 아니고.
 */
export default forwardRef(function InputExtend(props: InputExtendProp, ref: Ref<HTMLInputElement>) {

  const {
    /**
     * HTML input Prop
     */
    onKeyUp, type, maxLength, onChange, onKeyDown,

    /**
     * Custom Prop
     */
    onCtrlV, onEnter, onChangeText, ...rest
  } = {...DEFAULT_INPUT_PROPS, ...props};

  const customOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {

    switch (event.key) {
      case 'Enter':
        onEnter?.(event);
        break;
    }

    onKeyDown?.(event);

  }, [onKeyDown, onEnter]);

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

    if (onChangeText) {
      const result = value.slice(0, maxLength);
      onChangeText(result);
    }
    onChange?.(event);
  }, [maxLength, onChange, onChangeText]);

  const onInvalid = useCallback((event: FormEvent<HTMLInputElement>) => {
    //invalid event때문에 type email했을 때 'as'만 입력하고 엔터치면 system alert이 발생했던 것. 이것은 form의 submit 이벤트를 prevent한다고 사라지지않음.
    event.preventDefault();
  }, []);

  return (
      <input ref={ref} type={type} onInvalid={onInvalid} onKeyUp={customOnKeyUp} onChange={customOnChange} onKeyDown={customOnKeyDown} {...rest}/>
  );
});
