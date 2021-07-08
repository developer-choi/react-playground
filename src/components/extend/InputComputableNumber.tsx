import React, {useCallback, useMemo} from 'react';
import InputText, {InputTextProp} from '@components/extend/InputText';
import {numberWithComma} from '../../utils/extend/number';

/**
 * Overview : input component with "input type number" and only numbers.
 *
 * Feature 1. "type password" correspondence; apparently masked, but in reality only numbers are entered.
 *
 * Feature 2.
 * Negative income response. What the majority of input type number is often rather should not be a negative input. (input prices, etc.)
 * So, basically negative input from, but should function well in this. if it is a negative input to allow this.
 *
 * Feature 2-1. Must be inputted when only one '-' is entered for negative import power. (The string '-' itself is not a number, so it becomes NaN.)
 * Feature 2-2. Must fit well with other props functions. It still negative, even when other functions shall be operated by well. such as maxDecimalLength
 *
 * Feature 3. Decimal input function.
 * When a decimal number is entered up to 12345," the response must be made even if the end ends with a . but is not a valid Number type.
 *
 * Feature 3. Support for various additional functions (such as commas being entered between them, maximal integer decimal places, etc.)
 *
 * Feature 4. All of the above functions must also work when you do Control V.
 */

export interface InputNumberOption {
  /**
   * You can specify a decimal maximum length for the input value.
   */
  maxDecimalLength?: number;
  
  /**
   * You can specify an integer maximum length for the input value.
   */
  maxIntegerLength?: number;
  
  enableComma?: boolean;
  enableNegative?: boolean;
  enableDecimal?: boolean;
}

export type InputNumberProp = Omit<InputTextProp, 'type'> & InputNumberOption;

export default function InputComputableNumber({maxDecimalLength, maxIntegerLength, onChangeText, enableNegative = false, enableComma, value, ignoreEventKeys = EMPTY_ARRAY, enableDecimal = true, ...rest}: InputNumberProp) {
  
  const _onChangeText = useCallback((text: string) => {
    onChangeText?.(parseText(text, value, {enableNegative, enableComma, maxDecimalLength, maxIntegerLength}));
  }, [maxDecimalLength, maxIntegerLength, onChangeText, enableComma, enableNegative, value]);
  
  const _ignoreEventKeys = useMemo(() => {
    const keys = [...ignoreEventKeys];
    
    if (!enableNegative) {
      keys.push('-');
    }
  
    if (!enableDecimal) {
      keys.push('.');
    }
  
    return keys;
  }, [ignoreEventKeys, enableNegative, enableDecimal]);
  
  return (
      <InputText
          onChangeText={_onChangeText}
          type={enableComma ? undefined : 'number'}
          ignoreEventKeys={_ignoreEventKeys}
          value={enableComma ? numberWithComma(value) : value}
          {...rest}
      />
  );
}

const EMPTY_ARRAY = [] as string[];

function parseText(text: string, prevValue: string, {enableComma, enableNegative, maxIntegerLength, maxDecimalLength}: InputNumberOption ) {
  /**
   * In all cases with InputComputableNumber components,
   * we will remove spaces before and after strings because we believe that space entry is not required.
   */
  const trimmedText = text.trim();
  
  /**
   * If enableNegative is true, ignoreEventKeys is already blocking the input itself.
   * Nevertheless, the reason for this check is to respond to Control V.
   */
  if (trimmedText === '-') {
    return enableNegative ? '-' : '';
  }
  
  /**
   * In most cases, the first text is - for negative input, since the user enters letters on the keyboard.
   * These cases are easy to implement by skipping all validation.
   */
  if (trimmedText === '') {
    return '';
  }
  
  const commaNextText = enableComma ? trimmedText.replace(/,/g, '') : trimmedText;
  
  /**
   * There are two reasons for converting to parseInt() instead of Number Constructor.
   *
   * First, if a user enters a letter by keyboard, the text is entered from left to right, so it can be prevented when a number is entered and not a number is entered.
   * This is the default action of parseInt() until a string other than a number appears.
   *
   * Secondly, if you do Control V, only the places where you can parse with numbers will be saved.
   */
  const parsedNumber = parseInt(commaNextText);
  
  /**
   * Since the text above is all crossed out for empty or '-' cases, if NaN occurs here, the user can unconditionally conclude that a non-numeric value has been entered.
   */
  if (Number.isNaN(parsedNumber)) {
    return prevValue;
  }
  
  /**
   * 123456. 이런식으로 뭔가 소수값입력하려고 .딱하나찍었을 때 위에 parseInt()의 특성때문에 .입력을못해..
   * 그런데 이거랑 정수자리수 소수자리수 체크랑 같이 잘 작동해야하는데 아 머리터지네..
   *
   * if(parsedNumber && enableDecimal && )
   */
  
  const parsedString = String(parsedNumber);
  
  if (!isValidNumberLength(parsedString, {maxIntegerLength, maxDecimalLength})) {
    return prevValue;
  }
  
  return parsedString;
}

function isValidNumberLength(value: string, {maxDecimalLength, maxIntegerLength}: Pick<InputNumberProp, 'maxDecimalLength' | 'maxIntegerLength'>) {
  const {integer, decimal} = splitNumberDot(value);
  console.log(integer, decimal);
  
  if (maxDecimalLength !== undefined && decimal.length > maxDecimalLength) {
    return false;
  }
  
  if (maxIntegerLength !== undefined && integer.length > maxIntegerLength) {
    return false;
  }
  
  return true;
}

function splitNumberDot(value: string): {integer: string, decimal: string} {
  const integer = Math.floor(Math.abs(Number(value))).toString();
  const dotIndex = value.indexOf('.');
  const decimal = dotIndex === -1 ? '' : value.slice(dotIndex + 1, value.length);
  return {
    integer, decimal
  };
}
