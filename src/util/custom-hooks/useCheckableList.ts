import {useCallback, useRef, useState} from 'react';
import {replace} from '@util/extend/array';
import {sortNumbersInAscending} from '@util/extend/number';
import {useEffectFromTheSecondTime} from '@util/custom-hooks/useEffectFromTheSecondTime';

type PkType = number;

export interface UseCheckableListParam<T extends Object> {
  list: T[];
  pkExtractor: (item: T) => PkType;
}

export interface UseCheckableListResult<T extends Object> {
  selectedList: PkType[];
  onChangeChecked: (checked: boolean, index: number) => void;
  onMultipleChecked: (index: number) => void;
  toggleAllChecked: () => void;
  isCheckedItem: (index: number) => boolean;
  haveSomeChecked: boolean;
}

// 별도의 체크 목록 state를 위한 custom hooks
export default function useCheckableList<T>({pkExtractor, list}: UseCheckableListParam<T>): UseCheckableListResult<T> {
  const [checkedList, setCheckedList] = useState(list.map(item => ({
    pk: pkExtractor(item),
    checked: false
  })));

  useEffectFromTheSecondTime(useCallback(() => {
    setCheckedList(prevState => {
      const prevSelectedList = prevState.reduce((a, b) => {

        if (b.checked) {
          return a.concat(b.pk);

        } else {
          return a;
        }

      }, [] as number[]);

      return list.map(value => {
        const pk = pkExtractor(value);

        if (prevSelectedList.includes(pk)) {
          return {
            pk,
            checked: true
          };
        } else {
          return {
            pk,
            checked: false
          };
        }
      });
    });
  }, [list, pkExtractor]));

  const lastCheckedIndexRef = useRef<number>();

  const isAllChecked = list.length === 0 ? false : checkedList.every(({checked}) => checked);
  const haveSomeChecked = checkedList.some(({checked}) => checked);
  
  const onChangeChecked = useCallback((checked: boolean, targetIndex: number) => {
    setCheckedList(prevState => replace(prevState, ((value, index) => index === targetIndex), item => ({...item, checked})));

    if (checked) {
      lastCheckedIndexRef.current = targetIndex;
    }
  }, []);
  
  const toggleAllChecked = useCallback(() => {
    setCheckedList(prevState => prevState.map(({pk}) => ({pk, checked: !isAllChecked})));
  }, [isAllChecked]);
  
  const onMultipleChecked = useCallback((targetIndex: number) => {
    if (!lastCheckedIndexRef.current) {
      return;
    }

    const [startIndex, endIndex] = sortNumbersInAscending([targetIndex, lastCheckedIndexRef.current]);

    setCheckedList(prevState => prevState.map((prev, index) => {
      if (startIndex <= index && index < endIndex) {
        return {
          pk: prev.pk,
          checked: true
        };

      } else {
        return prev;
      }
    }));
  }, []);
  
  const isCheckedItem = useCallback((targetIndex: number) => {
    return !!checkedList.find((value, index) => index === targetIndex)?.checked;
  }, [checkedList]);

  const selectedList = checkedList.reduce((a, b) => {
    if (b.checked) {
      return a.concat(b.pk);
    } else {
      return a;
    }
  }, [] as PkType[]);

  return {
    onChangeChecked,
    onMultipleChecked,
    toggleAllChecked,
    isCheckedItem,
    selectedList,
    haveSomeChecked,
  };
}
