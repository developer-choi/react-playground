import AutoNumeric, {Options} from 'autonumeric';
import {ComponentPropsWithoutRef, useCallback, useEffect, useRef} from 'react';
import {InternalFieldName, UseFormRegisterReturn} from 'react-hook-form';

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

    // strictMode true가 기본값이어서 개발빌드에서는 2회 등록될 수 있음 주의
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
