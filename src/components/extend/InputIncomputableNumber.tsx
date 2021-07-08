import React, {useCallback} from 'react';
import InputText, {InputTextProp} from '@components/extend/InputText';

export interface InputIncomputableNumberProp extends Omit<InputTextProp, 'type' | 'ignoreEventKeys'> {
  enableMask?: boolean;
}

/**
 * Overview: Input components used when you want to receive only numbers that cannot be operated.
 * For example, you can use it when you receive a phone number or zip code consisting only of numbers.
 */
export default function InputIncomputableNumber({enableMask, onChangeText, ...rest}: InputIncomputableNumberProp) {
  
  const _onChangeText = useCallback((text: string) => {
    const trimmedText = text.trim();
  
    // Skip all process
    if (trimmedText === '') {
      onChangeText?.('');
      return;
    }
  
    if (!validateText(trimmedText)) {
      return;
    }
  
    onChangeText?.(parseText(trimmedText));
  }, [onChangeText]);
  
  return (
      <InputText
          type={enableMask ? 'text' : 'number'}
          ignoreEventKeys={NOT_NUMERIC_KEY}
          onChangeText={_onChangeText}
          {...rest}
      />
  );
}

/**
 * The text consists of numbers only,
 * but since it has no purpose for the operation,
 * the use of the parseInt or Number Constrcutor does not allow for very large numbers.
 * Therefore, it was implemented based on String API.
 */
function parseText(text: string): string {
  let _text = '';
  
  for (const char of text) {
    if (!NUMBERS.includes(char)) {
      break;
    }
  
    _text += char;
  }
  
  return _text;
}

function validateText(text: string): boolean {
  const characters = Array.from(new Set(text.split('')));
  return characters.every(character => NUMBERS.includes(character));
}

const NOT_NUMERIC_KEY = ['-', '.'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
