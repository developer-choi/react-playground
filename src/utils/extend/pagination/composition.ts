import {PageServerComponentProps} from '@forworkchoe/core/utils';
import {getBasicPagination} from '@/utils/extend/pagination/variants/basic';
import {PageElement, PageElementWithHref} from '@/utils/extend/pagination/index';

export interface CreatePaginationParam {
  searchParams: PageServerComponentProps['searchParams'] | URLSearchParams;
  config: {
    total: number; // 전체 게시글 갯수
    limit: number; // 1 페이지에 노출되야하는 게시글 갯수
    size: number; // 1 페이지에 노출되야하는 페이지 갯수
  };
  pageQueryKey?: string; // default 'page', URL 방식에서만 사용됨.
  currentPage?: number; // onClick 방식에서만 사용됨.
}

export function createPagination(params: CreatePaginationParam) {
  const {config: {total, size}} = params;

  // 게시글이 없어요 노출
  if (total <= 0) {
    return null;
  }

  try {
    const {pageQueryKey, currentPage, totalPage, urlSearchParams} = validatePagination(params);

    /**
     * 여기서 다양한 종류의 페이지네이션 방식에 따라
     * first, previous, next, last, elements를 계산해서 리턴하면되는데,
     * 일단 basic 방식 하나만 지원한다고 가정
     */
    const pagination =  getBasicPagination({config: {size, totalPage}, currentPage});

    return {
      first: createPageHref({element: pagination.first, pageQueryKey, urlSearchParams}),
      previous: createPageHref({element: pagination.previous, pageQueryKey, urlSearchParams}),
      elements: pagination.elements.map(element => createPageHref({element, pageQueryKey, urlSearchParams})),
      next: createPageHref({element: pagination.next, pageQueryKey, urlSearchParams}),
      last: createPageHref({element: pagination.last, pageQueryKey, urlSearchParams})
    };
  } catch (error) {
    // 게시글이 없어요 노출
    if (error instanceof RangeError) {
      return null;

    } else {
      throw error;
    }
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
interface CreateHrefParams {
  element: PageElement;
  urlSearchParams: URLSearchParams;
  pageQueryKey: string;
}

function createPageHref({element: {page, ...rest}, pageQueryKey, urlSearchParams}: CreateHrefParams): PageElementWithHref {
  const params = new URLSearchParams(urlSearchParams);
  params.set(pageQueryKey, page.toString());
  return {
    ...rest,
    page,
    href: `?${params.toString()}`
  }
}

/**
 * Next.js 서버 컴포넌트의 searchParams 객체를 표준 URLSearchParams 객체로 변환합니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams#parameters
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/page
 */
function searchParamsToURLSearchParams(searchParams: PageServerComponentProps['searchParams']): URLSearchParams {
  const queryParams: string[][] = Object.entries(searchParams).flatMap(
    ([key, value]) => {
      if (value === undefined) return [];
      if (Array.isArray(value)) return value.map(v => [key, v]);
      return [[key, value]];
    }
  );

  return new URLSearchParams(queryParams);
}

function validatePagination({currentPage, pageQueryKey, config: {total, limit}, searchParams}: CreatePaginationParam) {
  if (typeof currentPage === 'number' && typeof pageQueryKey === 'string') {
    throw new TypeError('currentPage와 pageQueryKey를 동시에 지정할 수 없습니다. URL 방식은 둘 다 전달 하지않거나, pageQueryKey만 전달하면 되고, onClick 방식은 currentPage만 전달하면 됩니다.');
  }

  const urlSearchParams = searchParams instanceof URLSearchParams ? searchParams : searchParamsToURLSearchParams(searchParams);
  const resultPageQueryKey = pageQueryKey ?? 'page';
  let resultCurrentPage = typeof currentPage === 'number' ? currentPage : Number(urlSearchParams.get(resultPageQueryKey));

  if (Number.isNaN(resultCurrentPage) || resultCurrentPage < 1) {
    resultCurrentPage = 1;
  }

  const dividedValue = Math.floor(total / limit);
  const totalPage = (total % limit === 0) ? dividedValue : dividedValue + 1;

  if (resultCurrentPage > totalPage) {
    throw new RangeError('접근 한 페이지가 전체 페이지 보다 큽니다.');
  }

  return {
    currentPage: resultCurrentPage,
    totalPage,
    urlSearchParams,
    pageQueryKey: resultPageQueryKey
  };
}
