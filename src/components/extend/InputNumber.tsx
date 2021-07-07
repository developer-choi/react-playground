import React, {useCallback} from 'react';
import InputText, {InputTextProp} from '@components/extend/InputText';
import {numberWithComma} from '../../utils/extend/number';

export interface InputNumberProp extends InputTextProp {
  /**
   * 입력값의 소수 최대길이를 지정할 수 있습니다.
   */
  maxDecimalLength?: number;
  
  /**
   * 입력값의 정수 최대길이를 지정할 수 있습니다.
   */
  maxIntegerLength?: number;
  
  enableComma?: boolean;
  
  type?: 'number' | 'password';
}

export default function InputNumber({maxDecimalLength, maxIntegerLength, onChangeText, type = 'number', ignoreEventKeys = DEFAULT_IGNORE_EVENT_KEYS, enableComma, value, ...rest}: InputNumberProp) {
  
  const _onChangeText = useCallback((text: string) => {
    const _text = enableComma ? text.replace(/,/g, '') : text;
  
    if (!isValidNumberLength(_text, {maxIntegerLength, maxDecimalLength})) {
      return;
    }
  
    onChangeText?.(_text);
  }, [maxDecimalLength, maxIntegerLength, onChangeText, enableComma]);
  
  return (
      <InputText
          onChangeText={_onChangeText}
          type={enableComma ? undefined : type}
          ignoreEventKeys={ignoreEventKeys}
          allowValues={type === 'password' ? NUMBERS_EVENT_KEYS : undefined}
          value={enableComma ? numberWithComma(value) : value}
          {...rest}
      />
  );
}

const DEFAULT_IGNORE_EVENT_KEYS = ['-'];

const NUMBERS_EVENT_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function isValidNumberLength(value: string, {maxDecimalLength, maxIntegerLength}: Pick<InputNumberProp, 'maxDecimalLength' | 'maxIntegerLength'>) {
  const {integer, decimal} = splitNumberDot(value);
  
  if (maxDecimalLength !== undefined && decimal.length > maxDecimalLength) {
    return false;
  }
  
  if (maxIntegerLength !== undefined && integer.length > maxIntegerLength) {
    return false;
  }
  
  return true;
}

function splitNumberDot(value: string): {integer: string, decimal: string} {
  const integer = Math.floor(Number(value)).toString();
  const dotIndex = value.indexOf('.');
  const decimal = dotIndex === -1 ? '' : value.slice(dotIndex + 1, value.length);
  return {
    integer, decimal
  };
}
