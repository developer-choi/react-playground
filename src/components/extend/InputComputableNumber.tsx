import React, {useCallback, useMemo} from 'react';
import InputText, {InputTextProp} from '@components/extend/InputText';
import {numberWithComma} from '../../utils/extend/number';
import {count} from '../../utils/extend/string';

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
  max?: number;
  
  enableComma?: boolean;
  enableDecimal?: boolean;
}

export type InputComputableNumberProp = Omit<InputTextProp, 'type' | 'min'> & InputComputableNumberOption;

export default function InputComputableNumber(props: InputComputableNumberProp) {
  
  const {
    maxIntegerLength = DEFAULT_MAX_INTEGER_LENGTH,
    maxDecimalLength,
    enableComma = false,
    enableDecimal = true,
    ignoreEventKeys = EMPTY_ARRAY,
    onChangeText,
    max,
    value,
    ...rest
  } = props;
  
  const _onChangeText = useCallback((text: string) => {
    const cleanedText = cleanText(text, {enableComma});
  
    if (!isPossibleToBeNumber(cleanedText, enableDecimal)) {
      return;
    }
  
    if (!validateNumber(cleanedText, {max, maxIntegerLength, maxDecimalLength})) {
      return;
    }
    
    onChangeText?.(cleanedText);
    
  }, [maxDecimalLength, maxIntegerLength, onChangeText, enableComma, enableDecimal, max]);
  
  const _ignoreEventKeys = useMemo(() => {
    const keys = ignoreEventKeys.concat(BASE_IGNORE_KEYS);
    
    if (!enableDecimal) {
      keys.push('.');
    }
  
    return keys;
  }, [ignoreEventKeys, enableDecimal]);
  
  const type = enableComma ? undefined : 'number';
  
  return (
      <InputText
          onChangeText={_onChangeText}
          type={type}
          inputMode={type === 'number' ? undefined : enableDecimal ? 'decimal' : 'numeric'}
          value={enableComma ? numberWithComma(value) : value}
          ignoreEventKeys={_ignoreEventKeys}
          {...rest}
      />
  );
}

function isPossibleToBeNumber(text: string, enableDecimal: boolean): boolean {
  
  const convertedNumber = Number(text);
  
  //Only for input type is not number (When enableComma is true)
  if (Number.isNaN(convertedNumber)) {
    return false;
  }
  
  //Only for input type is not number (When enableComma is true)
  const dotCount = count(text, '\\.');
  
  if (enableDecimal && dotCount > 1) {
    return false;
  }
  
  if (!enableDecimal && dotCount > 0) {
    return false;
  }
  
  return true;
}

function validateNumber(text: string, options: Pick<InputComputableNumberOption, 'max' | 'maxDecimalLength' | 'maxIntegerLength'>) {
  const {max, maxDecimalLength, maxIntegerLength} = options;
  const {decimal, integer} = splitNumberDot(text);
  
  if (maxDecimalLength !== undefined && decimal.length > maxDecimalLength) {
    return false;
  }
  
  if (maxIntegerLength !== undefined && integer.length > maxIntegerLength) {
    return false;
  }
  
  const convertedNumber = Number(text);
  
  if (max !== undefined && max < convertedNumber) {
    return false;
  }
  
  return true;
}

const DEFAULT_MAX_INTEGER_LENGTH = Number.MAX_SAFE_INTEGER.toString().length;
const EMPTY_ARRAY = [] as string[];

// https://stackoverflow.com/questions/64138536/react-input-type-number-fields-dont-trigger-onchange
const BASE_IGNORE_KEYS = ['e', 'E', '+', '-'];

function cleanText(text: string, {enableComma}: Pick<InputComputableNumberOption, 'enableComma'>) {
  /**
   * In all cases with InputComputableNumber components,
   * we will remove spaces before and after strings because we believe that space entry is not required.
   */
  const trimmedText = text.trim();
  return enableComma ? trimmedText.replace(/,/g, '') : trimmedText;
}

function splitNumberDot(value: string): { integer: string, decimal: string } {
  const integer = Math.floor(Math.abs(Number(value))).toString();
  const dotIndex = value.indexOf('.');
  const decimal = dotIndex === -1 ? '' : value.slice(dotIndex + 1, value.length);
  return {
    integer, decimal
  };
}
