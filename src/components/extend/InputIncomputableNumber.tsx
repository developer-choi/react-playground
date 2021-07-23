import React, {useCallback} from 'react';
import InputText, {InputTextProp} from '@components/extend/InputText';
import {parseString} from '../../utils/extend/string';

export interface InputIncomputableNumberProp extends Omit<InputTextProp, 'type' | 'preventEventKeys'> {
  enableMask?: boolean;
}

/**
 * Overview: Input components used when you want to receive only numbers that cannot be operated.
 * For example, you can use it when you receive a phone number or zip code consisting only of numbers.
 */
export default function InputIncomputableNumber({enableMask, onChangeText, ...rest}: InputIncomputableNumberProp) {
  
  const _onChangeText = useCallback((text: string) => {
    const trimmedText = text.trim();
  
    /**
     * The text consists of numbers only,
     * but since it has no purpose for the operation,
     * the use of the parseInt() or Number() does not allow for very large numbers.
     * Therefore, it was implemented based on String API.
     */
    onChangeText?.(parseString(trimmedText, NUMBERS));
  }, [onChangeText]);
  
  const type = enableMask ? 'password' : 'number';
  
  return (
      <InputText
          type={type}
          inputMode={type === 'password' ? 'numeric' : undefined}
          preventEventKeys={NOT_NUMERIC_KEY}
          onChangeText={_onChangeText}
          {...rest}
      />
  );
}

const NOT_NUMERIC_KEY = ['-', '.'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
