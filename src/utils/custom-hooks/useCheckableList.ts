import React, {useState} from 'react';

export interface UseCheckableListParam<T extends Object, P = number> {
  pkExtractor: (item: T) => P;
  list: T[];
}

export interface UseCheckableListResult<T extends Object, P = number> {
  checkedList: P[];
  onChangeChecked: (checked: boolean, itemPk: P) => void;
  selectAll: () => void;
}

// 별도의 체크 목록 state를 위한 custom hooks
export default function useCheckableList<T, P>({pkExtractor, list}: UseCheckableListParam<T, P>): UseCheckableListResult<T, P> {
  const [checkedList, setCheckedList] = useState<P[]>([]);
  
  const onChangeChecked = React.useCallback((checked: boolean, itemPk: P) => {
    setCheckedList(prevState => {
      if (checked) {
        return prevState.concat(itemPk);
      } else {
        return prevState.filter(pk => pk !== itemPk);
      }
    });
  }, []);
  
  const selectAll = React.useCallback(() => {
    setCheckedList(prevState => prevState.length === list.length ? prevState : list.map(pkExtractor));
  }, [list, pkExtractor]);
  
  return {
    checkedList,
    onChangeChecked,
    selectAll
  };
}
