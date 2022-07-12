import {useCallback} from 'react';

export interface Sort<Orderby extends string> {
  orderby: Orderby;
  direction: Direction;
}

export type Direction = 'asc' | 'desc';
export type OnSortFunction<OrderbyType extends string> = (orderby: OrderbyType, direction: Direction) => void;

export interface SortButtonParam<OrderbyType extends string> {
  orderby: OrderbyType;
  onSort: OnSortFunction<OrderbyType>;
  currentSort: Sort<OrderbyType> | undefined;
}

export interface SortButtonResult {
  currentDirection: Direction | undefined;
  onAscClick: () => void;
  onDescClick: () => void;
}

export function useSortButton<OrderbyType extends string>({onSort, currentSort, orderby}: SortButtonParam<OrderbyType>): SortButtonResult {
  
  const onAscClick = useCallback(() => {
    onSort(orderby, 'asc');
  }, [onSort, orderby]);
  
  const onDescClick = useCallback(() => {
    onSort(orderby, 'desc');
  }, [onSort, orderby]);
  
  return {
    currentDirection: (currentSort === undefined || currentSort.orderby !== orderby) ? undefined : currentSort.direction,
    onAscClick,
    onDescClick
  };
}
