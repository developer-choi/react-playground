import React, {useCallback} from 'react';
import InputExtend, {InputExtendProp} from '@components/bug/BugInputExtend';

export interface InputNumberProp extends InputExtendProp {
  /**
   * 입력값의 소수 최대길이를 지정할 수 있습니다.
   */
  maxDecimalLength?: number;
  
  /**
   * 입력값의 정수 최대길이를 지정할 수 있습니다.
   */
  maxIntegerLength?: number;
  
  type?: 'number' | 'password';
}

export default function BugInputNumber({maxDecimalLength, maxIntegerLength, onChangeText, type = 'number', ignoreValues = DEFAULT_IGNORE_VALUES_WHEN_TYPE_NUMBER, ...rest}: InputNumberProp) {
  
  const _onChangeText = useCallback((text: string) => {
    const {integer, decimal} = splitNumberDot(text);
  
    if (maxDecimalLength !== undefined && decimal.length > maxDecimalLength) {
      return;
    }
  
    if (maxIntegerLength !== undefined && integer.length > maxIntegerLength) {
      return;
    }
  
    onChangeText?.(text);
  }, [maxDecimalLength, maxIntegerLength, onChangeText]);
  
  return (
      <InputExtend
          onChangeText={_onChangeText}
          type={type}
          ignoreValues={type === 'password' ? undefined : ignoreValues}
          allowValues={type === 'password' ? NUMBERS_EVENT_KEYS : undefined}
          {...rest}
      />
  );
}

const DEFAULT_IGNORE_VALUES_WHEN_TYPE_NUMBER = ['-'];

const NUMBERS_EVENT_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function splitNumberDot(value: string): {integer: string, decimal: string} {
  const integer = Math.floor(Number(value)).toString();
  const dotIndex = value.indexOf('.');
  const decimal = dotIndex === -1 ? '' : value.slice(dotIndex + 1, value.length);
  return {
    integer, decimal
  };
}
