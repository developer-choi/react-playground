import React, {ChangeEvent, FormEvent, forwardRef, KeyboardEvent, Ref, useCallback} from 'react';
import {DEFAULT_INPUT_PROPS, InputExtendProp} from './input-extend';
import {getResultCallback} from '../../utils/form';
import {decimalSlice} from '../../utils/validate/number';

export default forwardRef(function InputExtend(props: InputExtendProp, ref: Ref<HTMLInputElement>) {

  const {onKeyUp, toLowerCase, maxLength, onCtrlV, onTab, onEnter, onChangeText, onChange, onKeyDown, type, maxDecimalLength, ...rest} = {...DEFAULT_INPUT_PROPS, ...props};

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
    const result = onChangeTextResult(event.target.value, {maxDecimalLength, type, maxLength, toLowerCase});
    onChangeText?.(result);
    onChange?.(event);
  }, [maxDecimalLength, type, maxLength, onChange, toLowerCase, onChangeText]);

  const onInvalid = useCallback((event: FormEvent<HTMLInputElement>) => {
    //invalid event때문에 type email했을 때 'as'만 입력하고 엔터치면 system alert이 발생했던 것. 이것은 form의 submit 이벤트를 prevent한다고 사라지지않음.
    event.preventDefault();
  }, []);

  const _onKeyDown = getResultCallback(onKeyDown, customOnKeyDown, [onEnter, onCtrlV]);
  const _onKeyUp = getResultCallback(onKeyUp, customOnKeyUp, [onCtrlV]);
  const _onChange = getResultCallback(onChange, customOnChange, [onChangeText]);

  return (
      <input ref={ref} type={type} onInvalid={onInvalid} onKeyUp={_onKeyUp} onChange={_onChange} onKeyDown={_onKeyDown} {...rest}/>
  );
});

function onChangeTextResult(eventTargetValue: string, {toLowerCase, type, maxDecimalLength, maxLength}: Pick<InputExtendProp, 'type' | 'maxDecimalLength' | 'maxLength' | 'toLowerCase'>) {

  const truncatedValue = eventTargetValue.slice(0, maxLength);

  if (maxDecimalLength === undefined) {
    return toLowerCase ? truncatedValue.toLowerCase() : truncatedValue;
  }

  if (type !== 'number') {
    console.warn('maxDecimalLength Prop이 작동하지 않았습니다. 이 Prop은 type이 number일때만 작동하는 Prop입니다.');
    return truncatedValue;
  }

  return decimalSlice(Number(truncatedValue), maxDecimalLength).toString();
}
