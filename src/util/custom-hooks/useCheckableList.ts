import {useCallback, useMemo, useState} from 'react';

export type PkType = string | number;

export interface UseCheckableListParam<T extends Object, P extends PkType = number> {
  pkExtractor: (item: T) => P;
  list: T[];
  requiredExtractor?: (item: T) => boolean;
}

export interface UseCheckableListResult<T extends Object, P extends PkType = number> {
  checkedList: P[];
  onChangeChecked: (checked: boolean, itemPk: P) => void;
  onMultipleChecked: (itemPks: P[]) => void;
  toggleAllChecked: () => void;
  isCheckedItem: (pk: P) => boolean;
  
  haveSomeChecked: boolean;
  isAllChecked: boolean;
  isAllRequiredChecked: boolean; // You can use this only for requiredExtractor is passed, default is false.
}

// 별도의 체크 목록 state를 위한 custom hooks
export default function useCheckableList<T, P extends PkType>({
                                                                pkExtractor,
                                                                list,
                                                                requiredExtractor
                                                              }: UseCheckableListParam<T, P>): UseCheckableListResult<T, P> {
  const pkList = useMemo(() => list.map(pkExtractor), [list, pkExtractor]);
  const requiredList = useMemo(() => {
    
    if (!requiredExtractor) {
      return [];
    }
    
    return list.reduce<P[]>((a, b) => {
      const required = requiredExtractor(b);
      
      if (required) {
        return a.concat(pkExtractor(b));
      } else {
        return a;
      }
    }, []);
    
  }, [list, pkExtractor, requiredExtractor]);
  
  const [checkedList, setCheckedList] = useState<P[]>([]);
  
  const isAllChecked = list.length === 0 ? false : list.length === checkedList.length;
  const haveSomeChecked = checkedList.length > 0;
  const isAllRequiredChecked = useMemo(() => {
    if (list.length === 0 || requiredList.length === 0) {
      return false;
    } else {
      return requiredList.every(pk => checkedList.includes(pk));
    }
  }, [checkedList, list.length, requiredList]);
  
  const onChangeChecked = useCallback((checked: boolean, itemPk: P) => {
    setCheckedList(prevState => {
      if (checked) {
        return prevState.concat(itemPk);
      } else {
        return prevState.filter(pk => pk !== itemPk);
      }
    });
  }, []);
  
  const toggleAllChecked = useCallback(() => {
    if (isAllChecked) {
      setCheckedList(prevState => prevState.length === 0 ? prevState : []);
    } else {
      setCheckedList(pkList);
    }
  }, [isAllChecked, pkList]);
  
  const onMultipleChecked = useCallback((itemPks: P[]) => {
    setCheckedList(prevState => Array.from(new Set(prevState.concat(itemPks))));
  }, []);
  
  const isCheckedItem = useCallback((pk: P) => {
    return checkedList.includes(pk);
  }, [checkedList]);
  
  return {
    onChangeChecked,
    onMultipleChecked,
    toggleAllChecked,
    isCheckedItem,
    checkedList,
    isAllChecked,
    haveSomeChecked,
    isAllRequiredChecked
  };
}
