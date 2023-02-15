import React from 'react';
import type {Href, PageElementData, PaginationMethod} from '@util/services/pagination/pagination-core';
import Link, {LinkProps} from 'next/link';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';
import {ignoreEvent} from '@util/extend/event/event';
import {useKeepQuery} from '@util/extend/router';

/**
 * methods를 아에 전달하지않을경우, 기본값으로 pageToHref가 작동되며
 * (현재 페이지 URL)에 추가로 page=n 이라는 query string만 추가됩니다.
 */
export interface PageElementProp extends Pick<LinkProps, 'replace'> {
  methods: PaginationMethod;
  children: string | number;
  className?: string;
  data: PageElementData;
}

export default function PageElement({methods, children, data, className, replace}: PageElementProp) {
  const {page, disable, active, prevent} = data;
  const _className = myClassName(className, {disable, active});

  const result = useMethodsWithDefault(data.page, methods);

  if ('href' in result) {
    return (
      <Link href={result.href} passHref {...DEFAULT_LINK_PROPS} replace={replace}>
        <Anchor className={_className} onClick={prevent ? ignoreEvent : undefined}>
          {children}
        </Anchor>
      </Link>
    );
  }

  return (
    <Anchor className={_className} onClick={prevent ? ignoreEvent : () => result.onClickPage(page)}>
      {children}
    </Anchor>
  );
}

type MethodsWithDefault = {
  href: Href;
} | {
  onClickPage: (page: number) => void
};

function useMethodsWithDefault(page: number, methods: PaginationMethod): MethodsWithDefault {
  const {getKeepQuery} = useKeepQuery();

  if (methods === 'defaultPageToHref') {
    return {
      href: getKeepQuery({page}),
    };

  } else if ('pageToHref' in methods) {
    return {
      href: methods.pageToHref(page)
    };

  } else {
    return {
      onClickPage: methods.onClickPage
    };
  }
}

const DEFAULT_LINK_PROPS: Pick<LinkProps, 'scroll' | 'prefetch'> = {
  scroll: false,
  prefetch: false,
};

const Anchor = styled.a`
  &.disable {
    cursor: not-allowed;
  }
`;
