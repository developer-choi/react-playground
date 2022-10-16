import type {MovablePageData, Pagination, PaginationParam} from '@util/paging';
import {useKeepQuery} from '@util/extend/router';
import {useCallback} from 'react';
import {getPagination} from '@util/paging';

export interface MovePageData extends MovablePageData {
  move: () => void;
}

export interface UsePagingResult extends Pick<Pagination, 'pages'> {
  move: (page: number) => void;
  first: MovePageData;
  previous: MovePageData;
  next: MovePageData;
  last: MovePageData;
}

export function usePagination(param: PaginationParam): UsePagingResult {
  const {pages, next, last, first, previous} = getPagination(param);

  const {push} = useKeepQuery();

  const moveSpecificPage = useCallback((page: number) => {
    push({
      page
    });
  }, [push]);

  const getMovePageData = useCallback(({page, movable}: MovablePageData) => {
    return {
      page,
      movable,
      move: () => {
        if (movable) {
          moveSpecificPage(page);
        }
      },
    };
  }, [moveSpecificPage]);

  return {
    move: moveSpecificPage,
    pages,
    first: getMovePageData(first),
    previous: getMovePageData(previous),
    next: getMovePageData(next),
    last: getMovePageData(last)
  };
}
