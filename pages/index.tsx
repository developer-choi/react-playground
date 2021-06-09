import React, {useCallback, useMemo} from 'react';
import {Button} from '@components/atom/button/button-presets';
import debounce from 'lodash/debounce';
import {DebouncedFunc, DebounceSettings} from 'lodash';

export default function Page() {
  
  const onClick = useDebouncedCallback(useCallback(() => {
    console.log('clicked');
  }, []));
  
  return (
      <Button onClick={onClick}>광클버튼</Button>
  );
}

function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, wait = 300, options?: DebounceSettings) {
  return useMemo<DebouncedFunc<T>>(() => (
      debounce(callback, wait, options)
  ), [callback, wait, options]);
}
