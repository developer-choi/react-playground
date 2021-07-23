import React, {useCallback, useMemo, ClipboardEvent} from 'react';
import InputText, {InputTextProp} from '@components/extend/InputText';
import {numberWithComma} from '../../utils/extend/number';
import {count} from '../../utils/extend/string';

export interface InputComputableNumberOption {
  maxIntegerLength?: number;
  maxDecimalLength?: number;
  max?: number;
  
  enableComma?: boolean;
  enableDecimal?: boolean;
}

export type InputComputableNumberProp = Omit<InputTextProp, 'type' | 'min'> & InputComputableNumberOption;

/**
 * Overview: Input components used when you want to receive only numbers that can be operated.
 * For example, you can use it when you input a price.
 *
 * Parameters passed to onChangeText() guarantee that they are not necessarily NaN when converted to Number().
 */
export default function InputComputableNumber(props: InputComputableNumberProp) {
  
  const {
    maxIntegerLength = DEFAULT_MAX_INTEGER_LENGTH,
    maxDecimalLength,
    enableComma = false,
    enableDecimal = true,
    preventEventKeys = EMPTY_ARRAY,
    onChangeText,
    max,
    value,
    onCopy,
    onCut,
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
  
  const _preventEventKeys = useMemo(() => {
    const keys = preventEventKeys.concat(BASE_IGNORE_KEYS);
    
    if (!enableDecimal) {
      keys.push('.');
    }
  
    return keys;
  }, [preventEventKeys, enableDecimal]);
  
  const _onCopy = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
    const {value} = event.target as HTMLInputElement;
    event.clipboardData.setData('text/plain', cleanText(value, {enableComma}));
    event.preventDefault();
    onCopy?.(event);
  }, [enableComma, onCopy]);
  
  const _onCut = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
    const {value} = event.target as HTMLInputElement;
    event.clipboardData.setData('text/plain', cleanText(value, {enableComma}));
    event.preventDefault();
    onChangeText?.('');
    onCut?.(event);
  }, [enableComma, onChangeText, onCut]);
  
  const type = enableComma ? undefined : 'number';
  
  return (
      <InputText
          onChangeText={_onChangeText}
          type={type}
          inputMode={type === 'number' ? undefined : enableDecimal ? 'decimal' : 'numeric'}
          value={enableComma ? numberWithComma(value) : value}
          preventEventKeys={_preventEventKeys}
          onCopy={_onCopy}
          onCut={_onCut}
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
