import type {Dispatch, SetStateAction} from 'react';
import {useCallback} from 'react';

export default function useToggleSetState(setState: Dispatch<SetStateAction<boolean>>) {
  return useCallback(() => {
    setState(prevState => !prevState);
  }, [setState]);
}
