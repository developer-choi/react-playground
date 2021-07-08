import React, {useCallback, useMemo} from 'react';
import InputText, {InputTextProp} from '@components/extend/InputText';
import {numberWithComma} from '../../utils/extend/number';

/**
 * Feature 2.
 * Negative income response. What the majority of input type number is often rather should not be a negative input. (input prices, etc.)
 * So, basically negative input from, but should function well in this. if it is a negative input to allow this.
 *
 * Feature 3. Decimal input function.
 * When a decimal number is entered up to 12345," the response must be made even if the end ends with a . but is not a valid Number type.
 *
 * Feature 3. Support for various additional functions (such as commas being entered between them, maximal integer decimal places, etc.)
 */

export interface InputComputableNumberOption {
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

export type InputComputableNumberProp = Omit<InputTextProp, 'type'> & InputComputableNumberOption;

export default function InputComputableNumber(props: InputComputableNumberProp) {
  
  const {
    maxIntegerLength = DEFAULT_MAX_INTEGER_LENGTH,
    maxDecimalLength,
    enableNegative = false,
    enableComma = false,
    enableDecimal = true,
    ignoreEventKeys = EMPTY_ARRAY,
    onChangeText,
    value,
    ...rest
  } = props;
  
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

const DEFAULT_MAX_INTEGER_LENGTH = Number.MAX_SAFE_INTEGER.toString().length;
const EMPTY_ARRAY = [] as string[];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const SKIP_TEXTS = ['-', '0', ''];

function parseText(text: string, prevValue: string, {enableComma, enableNegative, maxIntegerLength, maxDecimalLength, enableDecimal}: InputComputableNumberOption ) {
  
  const _text = cleanText(text, {enableComma, enableNegative});
  
  if (SKIP_TEXTS.includes(_text)) {
    return _text;
  }
  
  /**
   * There are two reasons for converting to parseInt() instead of Number Constructor.
   *
   * First, if a user enters a letter by keyboard, the text is entered from left to right, so it can be prevented when a number is entered and not a number is entered.
   * This is the default action of parseInt() until a string other than a number appears.
   *
   * Secondly, if you do Control V, only the places where you can parse with numbers will be saved.
   */
  const parsedNumber = enableDecimal ? parseFloat() : parseInt(_text);
  
  /**
   * Since the text above is all crossed out for empty or '-' cases, if NaN occurs here, the user can unconditionally conclude that a non-numeric value has been entered.
   */
  if (enableDecimal && ) {
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

function cleanText(text: string, {enableComma}: Pick<InputComputableNumberOption, 'enableNegative' | 'enableComma'>) {
  /**
   * In all cases with InputComputableNumber components,
   * we will remove spaces before and after strings because we believe that space entry is not required.
   */
  const trimmedText = text.trim();
  return enableComma ? trimmedText.replace(/,/g, '') : trimmedText;
}

function isValidNumberLength(value: string, {maxDecimalLength, maxIntegerLength}: Pick<InputComputableNumberProp, 'maxDecimalLength' | 'maxIntegerLength'>) {
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
