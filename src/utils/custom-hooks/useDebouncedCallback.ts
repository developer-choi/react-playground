import {DebouncedFunc, DebounceSettings} from 'lodash';
import {useMemo} from 'react';
import debounce from 'lodash/debounce';

/**
 * useCallback이 아닌 useMemo로 만든 근거는 https://github.com/facebook/react/issues/19240
 */
export default function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, wait = 300, options?: DebounceSettings) {
  return useMemo<DebouncedFunc<T>>(() => (
      debounce(callback, wait, options)
  ), [callback, wait, options]);
}
