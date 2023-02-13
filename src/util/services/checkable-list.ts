import {useCallback, useRef, useState} from 'react';
import {removeDuplicatedItems, replace} from '@util/extend/data-type/array';
import {sortNumbersInAscending} from '@util/extend/data-type/number';
import {useEffectFromTheSecondTime} from '@util/extend/react';

type PkType = number;

export interface UseCheckableListParam<T extends Object> {
  list: T[];
  pkExtractor: (item: T) => PkType;
}

export interface UseCheckableListResult<T extends Object> {
  selectedList: PkType[];
  onChangeChecked: (checked: boolean, targetPk: number) => void;
  onMultipleChecked: (index: number) => void;
  toggleAllChecked: () => void;
  isCheckedItem: (targetPk: number) => boolean;
  haveSomeChecked: boolean;
}

// 별도의 체크 목록 state를 위한 custom hooks
export default function useCheckableList<T extends Object>({pkExtractor, list}: UseCheckableListParam<T>): UseCheckableListResult<T> {
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

  const onChangeChecked = useCallback((checked: boolean, targetPk: number) => {
    setCheckedList(prevState => replace(prevState, (({pk}) => pk === targetPk), item => ({...item, checked})));

    if (checked) {
      lastCheckedIndexRef.current = checkedList.findIndex(({pk}) => pk === targetPk);
    }
  }, [checkedList]);

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

  const isCheckedItem = useCallback((targetPk: number) => {
    return !!checkedList.find(({pk}) => pk === targetPk)?.checked;
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

function useAnotherWay<T extends Object>({pkExtractor, list}: UseCheckableListParam<T>): UseCheckableListResult<T> {
  const [selectedList, setSelectedList] = useState<PkType[]>([]);

  useEffectFromTheSecondTime(useCallback(() => {
    setSelectedList(prevState => {

      return list.reduce((a, b) => {
        const pk = pkExtractor(b);

        if (prevState.includes(pk)) {
          return a.concat(pk);

        } else {
          return a;
        }
      }, [] as PkType[]);
    });
  }, [list, pkExtractor]));

  const lastCheckedIndexRef = useRef<number>();

  const isAllChecked = list.length === 0 ? false : selectedList.length === list.length;
  const haveSomeChecked = selectedList.length > 0;

  const onChangeChecked = useCallback((checked: boolean, targetPk: number) => {
    setSelectedList(prevState => checked ? prevState.concat(targetPk) : prevState.filter((value) => value !== targetPk));

    if (checked) {
      lastCheckedIndexRef.current = list.findIndex((value => pkExtractor(value) === targetPk)) as number;
    }
  }, [list, pkExtractor]);

  const toggleAllChecked = useCallback(() => {
    if (isAllChecked) {
      setSelectedList([]);

    } else {
      setSelectedList(list.map(value => pkExtractor(value)));
    }
  }, [isAllChecked, list, pkExtractor]);

  const onMultipleChecked = useCallback((targetIndex: number) => {
    if (!lastCheckedIndexRef.current) {
      return;
    }

    const [startIndex, endIndex] = sortNumbersInAscending([targetIndex, lastCheckedIndexRef.current]);
    const pks = list.slice(startIndex, endIndex).map((value => pkExtractor(value)));
    setSelectedList(prevState => removeDuplicatedItems(prevState.concat(pks)));
  }, [list, pkExtractor]);

  const isCheckedItem = useCallback((targetPk: number) => {
    return selectedList.includes(targetPk);
  }, [selectedList]);

  return {
    onChangeChecked,
    onMultipleChecked,
    toggleAllChecked,
    isCheckedItem,
    selectedList,
    haveSomeChecked,
  };
}
