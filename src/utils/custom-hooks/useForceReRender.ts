import {useCallback, useState} from 'react';

export function useForceReRender() {
  const [, setValue] = useState(false);
  
  return useCallback(() => {
    setValue(prevState => !prevState);
  }, []);
}
