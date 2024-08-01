import AutoNumeric, {Options} from 'autonumeric';
import {ChangeEvent, ComponentPropsWithoutRef, useCallback, useEffect, useRef} from 'react';
import {UseFormRegisterReturn, InternalFieldName, FieldValues, FieldPath, UseFormRegister, RegisterOptions} from 'react-hook-form';

/**
 * Defaults
 * 1. Disable decimal input
 * 2. Disable negative input
 * 3. Use comma as a thousand separator
 *
 * For decimalPlaces:
 * Case 1: If it is 0 (default), only whole numbers can be entered.
 * Case 2: If a positive integer is provided, the number of decimal places will be limited to that value.
 */
export interface ComputableNumberOptions extends Pick<Options, 'decimalPlaces' | 'maximumValue' | 'readOnly'> {
  allowNegative?: boolean;
}

/**
 * Hook for creating an <input> that accepts computable numeric values (e.g., price input).
 * To create an <input> for non-computable numeric values (e.g., phone number, account number), use useIncomputableNumberInput().
 *
 * This works by directly passing the HTML Element and enabling functionality via the library.
 */
export function useComputableNumberInput<T extends InternalFieldName>(registerResult: UseFormRegisterReturn<T>, options?: ComputableNumberOptions) {
  const {decimalPlaces = 0, maximumValue = Number.MAX_SAFE_INTEGER.toString(), allowNegative = false, ...restOptions} = options ?? {};
  const {ref, ...restRegisterResult} = registerResult;
  const inputRef = useRef<HTMLInputElement>();

  // https://www.react-hook-form.com/faqs/#Howtosharerefusage
  const refCallback = useCallback((element: HTMLInputElement | null) => {
    inputRef.current = element ?? undefined;
    ref(element);
  }, [ref]);

  useEffect(() => {
    if (!inputRef.current) {
      throw new TypeError('Ref was not provided to the input element!');
    }

    new AutoNumeric(inputRef.current, {
      decimalPlaces,
      maximumValue: maximumValue.toString(),
      minimumValue: allowNegative ? Number.MIN_SAFE_INTEGER.toString() : '0',
      modifyValueOnUpDownArrow: false,
      ...restOptions
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDecimalAllowed = Number(decimalPlaces) > 0;
  const inputMode: ComponentPropsWithoutRef<'input'>['inputMode'] = isDecimalAllowed ? 'decimal' : 'numeric';

  return {
    ref: refCallback,
    inputMode,
    ...restRegisterResult
  };
}

type UnsupportOptions = 'onChange' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate';

export interface IncomputableNumberOptions<T extends FieldValues, N extends FieldPath<T>> extends Omit<RegisterOptions<T, N>, UnsupportOptions> {
  type?: ComponentPropsWithoutRef<'input'>['type'];
  mask?: boolean;
}

/**
 * 숫자 (0 ~ 9)만 입력할 수 있고,
 * 숫자를 제외한, 숫자 관련 모든 문자를 입력할 수 없도록 하기 위한 함수.
 * (+ - dot e E는 각각 양수 음수 소수 큰수를 나타낼 때 사용하는 기호인데, 이 문자를 입력할 수 없도록 제한함)
 *
 * 인풋에서 사용자의 인터렉션(입력)을 막고싶은 경우 사용.
 * 막고싶지 않다면, 이 함수를 사용하지말고 특졍 액션 (submit, blur, onChange) 시점에 유효성검증과 에러메시지로 대체하세요.
 */
export function useIncomputableNumberInputRegister<T extends FieldValues, N extends FieldPath<T>>(register: UseFormRegister<T>, name: N, options?: IncomputableNumberOptions<T, N>) {
  const {type, mask, ...rest} = options ?? {};
  const _type = mask ? 'password' : type;
  const inputMode: ComponentPropsWithoutRef<'input'>['inputMode'] = _type === 'tel' || _type === undefined ? undefined : 'numeric';

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = parseString(event.target.value, NUMBERS);
  }, []);

  const setValueAs = useCallback((value: string) => {
    return parseString(value, NUMBERS);
  }, []);

  return {
    ...register(name, {...rest, onChange, setValueAs}),
    type: _type,
    inputMode
  };
}

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Returns truncated characters until they are found, such as parseInt().
 * If the first character is not allowed, an empty string is returned.
 *
 * @example ('123abc', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) => '123'
 */
export function parseString(text: string, allowCharacters: string[]) {
  let _text = '';

  for (const char of text) {
    if (!allowCharacters.includes(char)) {
      break;
    }

    _text += char;
  }

  return _text;
}
