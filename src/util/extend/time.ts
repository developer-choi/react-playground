import {useEffect, useState} from 'react';

export function useDelay(timeout: number) {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBool(true);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return bool;
}
