import React, {useEffect, useState} from 'react';
import type {Href, PageElementData, PaginationMethod} from '@util/services/pagination/pagination-core';
import Link, {LinkProps} from 'next/link';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';
import {preventClick} from '@util/extend/browser/event';
import {useKeepQuery} from '@util/extend/router';

/**
 * methods를 아에 전달하지않을경우, 기본값으로 pageToHref가 작동되며
 * (현재 페이지 URL)에 추가로 page=n 이라는 query string만 추가됩니다.
 */
export interface PageElementProp extends Pick<LinkProps, 'replace'> {
  methods?: PaginationMethod;
  children: string | number;
  className?: string;
  data: PageElementData;
}

export default function PageElement({methods = {}, children, data, className, replace}: PageElementProp) {
  const {onClickPage} = methods;

  const {page, disable, active} = data;
  const _className = myClassName(className, {disable, active});
  const prevent = disable || active;

  const href = useDefaultPageToHref(data.page, methods);

  if (href) {
    return (
      <Link href={href} passHref {...DEFAULT_LINK_PROPS} replace={replace}>
        <Anchor className={_className} onClick={prevent ? preventClick : undefined}>
          {children}
        </Anchor>
      </Link>
    );
  }

  return (
    <Anchor className={_className} onClick={prevent ? preventClick : () => onClickPage?.(page)}>
      {children}
    </Anchor>
  );
}

function useDefaultPageToHref(page: number, {onClickPage, pageToHref}: PaginationMethod) {
  const [href, setHref] = useState<Href | undefined>(initializeHref(page, {pageToHref, onClickPage}));
  const {getKeepQuery} = useKeepQuery();

  useEffect(() => {
    if (pageToHref || onClickPage) {
      setHref(initializeHref(page, {pageToHref, onClickPage}));
      return;
    }

    setHref(getKeepQuery({page}));
  }, [getKeepQuery, onClickPage, page, pageToHref]);

  return href;
}

function initializeHref(page: number, method: PaginationMethod) {
  const {onClickPage, pageToHref} = method ?? {};

  if (onClickPage) {
    return undefined;
  }

  if (pageToHref) {
    return pageToHref(page);
  }

  return undefined;
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
