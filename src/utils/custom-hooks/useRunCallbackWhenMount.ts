import {useCallback, useEffect, useRef} from 'react';

/**
 * 컴포넌트 제일윗줄에서 호출되야함.
 * 함수를 반환하며, 이 함수는 매개변수로 콜백함수를 받음.
 * 반환된 함수가 호출됬을 때, 마운트가 되어있지 않으면 콜백함수를 실행하지않음.
 */
export function useRunCallbackWhenMount() {
  const isMountRef = useRef(false);
  useEffect(() => {
    isMountRef.current = true;
    return () => {
      isMountRef.current = false;
    };
  }, []);
  
  return useCallback((callback: () => void) => {
    if (!isMountRef.current) {
      return;
    }
    
    callback();
  }, []);
}
