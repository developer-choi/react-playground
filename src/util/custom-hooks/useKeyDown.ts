import {useEffect} from 'react';
import {isMatchKeyboardEvent, isSomeKeyEnteredInWindow, MatchKeyboardEvent} from '@util/extend/keyboard-event';

export function useKeyDown(matchKeyboardEvent: MatchKeyboardEvent, callback: (event: KeyboardEvent) => void) {
  useEffect(() => {
    const keydownCallback = (event: KeyboardEvent) => {
      if (!isSomeKeyEnteredInWindow(event)) {
        return;
      }
  
      if (!isMatchKeyboardEvent(event, matchKeyboardEvent)) {
        return;
      }
  
      callback(event);
    };
    
    window.addEventListener('keydown', keydownCallback);
  
    return () => {
      window.removeEventListener('keydown', keydownCallback);
    };
  }, [callback, matchKeyboardEvent]);
}
