'use client';

import Link, {LinkProps} from 'next/link';
import React, {CSSProperties, PropsWithChildren, useCallback} from 'react';
import {useRouter} from 'next/navigation';

export interface CustomLinkProps extends PropsWithChildren<LinkProps> {
  style?: CSSProperties;
  className?: string;
}

/**
 * Doc: https://docs.google.com/document/d/1YHHOxCfMh_sxAw3AZQrsxR-2iyUH_R4A7qDGXEloQPc/edit?tab=t.0
 */
export default function CustomLink({prefetch = false, href, ...rest}: CustomLinkProps) {
  const router = useRouter();

  const onMouseEnter = useCallback(() => {
    router.prefetch(href as string);
  }, [href, router]);
  
  return (
    <Link prefetch={prefetch} onMouseEnter={onMouseEnter} href={href} {...rest}/>
  );
}
