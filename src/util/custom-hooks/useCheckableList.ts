import {useCallback, useState} from 'react';

export type PkType = string | number;

export interface UseCheckableListParam<T extends Object, P extends PkType = number> {
  pkExtractor: (item: T) => P;
  list: T[];
}

export interface UseCheckableListResult<T extends Object, P extends PkType = number> {
  checkedList: P[];
  onChangeChecked: (checked: boolean, itemPk: P) => void;
  onMultipleChecked: (itemPks: P[]) => void;
  selectAll: () => void;
}

// 별도의 체크 목록 state를 위한 custom hooks
export default function useCheckableList<T, P extends PkType>({pkExtractor, list}: UseCheckableListParam<T, P>): UseCheckableListResult<T, P> {
  const [checkedList, setCheckedList] = useState<P[]>([]);
  
  const onChangeChecked = useCallback((checked: boolean, itemPk: P) => {
    setCheckedList(prevState => {
      if (checked) {
        return prevState.concat(itemPk);
      } else {
        return prevState.filter(pk => pk !== itemPk);
      }
    });
  }, []);
  
  const selectAll = useCallback(() => {
    setCheckedList(prevState => prevState.length === list.length ? prevState : list.map(pkExtractor));
  }, [list, pkExtractor]);
  
  const onMultipleChecked = useCallback((itemPks: P[]) => {
    setCheckedList(prevState => Array.from(new Set(prevState.concat(itemPks))));
  }, []);
  
  return {
    checkedList,
    onChangeChecked,
    onMultipleChecked,
    selectAll
  };
}
