import type {Pagination, PaginationParam} from '@util/paging';
import {useKeepQuery} from '@util/extend/router';
import {useCallback} from 'react';
import {getPagination} from '@util/paging';

export interface UsePagingResult extends Pick<Pagination, 'pages' | 'canFirst' | 'canPrevious' | 'canNext' | 'canLast'> {
  goPage: (page: number) => void;
  goFirstPage: () => void;
  goPreviousPage: () => void;
  goNextPage: () => void;
  goLastPage: () => void;
}

export function usePagination(param: PaginationParam): UsePagingResult {
  const {
    pages,
    canPrevious,
    canNext,
    canLast,
    canFirst,
    firstPage,
    lastPage,
    previousPage,
    nextPage
  } = getPagination(param);

  const {push} = useKeepQuery();

  const goPage = useCallback((page: number) => {
    push({
      page
    });
  }, [push]);

  const goFirstPage = useCallback(() => {
    if (canFirst) {
      goPage(firstPage);
    }
  }, [canFirst, firstPage, goPage]);

  const goPreviousPage = useCallback(() => {
    if (canPrevious) {
      goPage(previousPage)
    }
  }, [canPrevious, goPage, previousPage]);

  const goNextPage = useCallback(() => {
    if (canNext) {
      goPage(nextPage);
    }
  }, [canNext, goPage, nextPage]);

  const goLastPage = useCallback(() => {
    if (canLast) {
      goPage(lastPage);
    }
  }, [canLast, goPage, lastPage]);

  return {
    goPage, goFirstPage, goPreviousPage, canLast, canFirst, canNext, goLastPage, goNextPage, canPrevious, pages
  };
}
