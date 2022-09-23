import {useCallback} from 'react';

export interface UseSortParam<O extends string> {
  orderby: O;
  onSort: (sort: Sort<O> | undefined) => void;
  currentSort: Sort<O> | undefined;
}

export interface UseSortResult {
  onAscClick: () => void;
  onDescClick: () => void;
  isActiveAsc: boolean;
  isActiveDesc: boolean;
}

export default function useSort<O extends string>({onSort, currentSort, orderby}: UseSortParam<O>): UseSortResult {
  const isSameOrderby = currentSort?.orderby === orderby;
  const isActiveAsc = isSameOrderby && currentSort.direction === 'asc';
  const isActiveDesc = isSameOrderby && currentSort.direction === 'desc';

  const onAscClick = useCallback(() => {
    if (isActiveAsc) {
      onSort(undefined);

    } else {
      onSort({
        direction: 'asc',
        orderby
      });
    }
  }, [isActiveAsc, onSort, orderby]);

  const onDescClick = useCallback(() => {
    if (isActiveDesc) {
      onSort(undefined);

    } else {
      onSort({
        direction: 'desc',
        orderby
      });
    }
  }, [isActiveDesc, onSort, orderby]);

  return {
    onAscClick,
    onDescClick,
    isActiveAsc,
    isActiveDesc
  };
}

export interface Sort<O extends string> {
  orderby: O;
  direction: Direction;
}

export type Direction = 'asc' | 'desc';
export const DIRECTIONS: Direction[] = ['asc', 'desc'];
