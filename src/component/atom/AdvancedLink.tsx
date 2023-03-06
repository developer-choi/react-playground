import React, {PropsWithChildren, useCallback, MouseEvent, useState, useEffect} from 'react';
import type {LinkProps} from 'next/link';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';

export interface AdvancedLinkProp extends Omit<PropsWithChildren<LinkProps>, 'href'> {
  prefetchTimeout?: number;
  prefetchingClassName?: string;
  className?: string;
  href: string;
}

export default function AdvancedLink({prefetchTimeout, prefetchingClassName, children, className, onClick, href, prefetch, ...rest}: AdvancedLinkProp) {
  const router = useRouter();
  const [prefetching, setPrefetching] = useState(false);

  const customPrefetch = useCallback(async () => {
    setPrefetching(true);
    await router.prefetch(href);
    setPrefetching(false);
  }, [href, router]);
  
  const _onClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    customPrefetch();
  }, [customPrefetch, onClick]);

  const _prefetch = prefetchTimeout === undefined ? prefetch : false;

  useEffect(() => {
    if (prefetchTimeout === undefined) {
      return;
    }
    
    const timeoutId = setTimeout(() => {
      customPrefetch();
    }, prefetchTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [customPrefetch, prefetchTimeout]);
  
  return (
    <Link href={href} prefetch={_prefetch} {...rest}>
      <StyledAnchor className={myClassName(className, {prefetching})} onClick={_onClick}>
        {children}
      </StyledAnchor>
    </Link>
  );
}

const StyledAnchor = styled.a`
  &.prefetching {
    background-color: red;
  }
`;
