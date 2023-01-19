import React from 'react';
import type {PageElementData, PaginationMethod} from '@util/services/pagination/pagination-core';
import Link, {LinkProps} from 'next/link';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';
import {preventClick} from '@util/extend/browser/event';

export interface PageElementProp extends Pick<LinkProps, 'replace'> {
  methods: PaginationMethod;
  children: string | number;
  className?: string;
  data: PageElementData;
}

export default function PageElement({methods, children, data, className, ...restLinkProps}: PageElementProp) {
  const {onClickPage, pageToHref} = methods;

  if (!!onClickPage === !!pageToHref) {
    throw new Error('Please pass either pageToHref or onClickPage.');
  }

  const {page, disable, active} = data;
  const _className = myClassName(className, {disable, active});

  if (pageToHref) {
    return (
      <Link href={pageToHref(page)} passHref {...DEFAULT_LINK_PROPS} {...restLinkProps}>
        <Anchor className={_className} onClick={(disable || active) ? preventClick : undefined}>
          {children}
        </Anchor>
      </Link>
    );
  }

  const _onClickPage = onClickPage as Required<PaginationMethod>['onClickPage'];

  return (
    <Anchor className={_className} onClick={disable ? preventClick : () => _onClickPage(page)}>
      {children}
    </Anchor>
  );
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
