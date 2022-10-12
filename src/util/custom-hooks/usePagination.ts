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
    goPage(firstPage);
  }, [firstPage, goPage]);

  const goPreviousPage = useCallback(() => {
    goPage(previousPage)
  }, [goPage, previousPage]);

  const goNextPage = useCallback(() => {
    goPage(nextPage);
  }, [goPage, nextPage]);

  const goLastPage = useCallback(() => {
    goPage(lastPage);
  }, [goPage, lastPage]);

  return {
    goPage, goFirstPage, goPreviousPage, canLast, canFirst, canNext, goLastPage, goNextPage, canPrevious, pages
  };
}
