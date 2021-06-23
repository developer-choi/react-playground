import {useEffect, useRef} from 'react';

export default function useIsFirstMount() {
  const ref = useRef(true);
  console.log(ref.current);
  useEffect(() => {
    ref.current = false;
  }, []);
  return ref.current;
}
