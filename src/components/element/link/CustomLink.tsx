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
 *
 * 1. 대부분의 경우 (prefetch = undefined) 마우스 오버하면 강제로 프리패칭됨. (SSR 로 만든 페이지라 할지라도)
 * 2. prefetch = false가 유용한 경우는 리스트로 수십개의 목록을 노출 시키고 그 목록 각각이 링크로 된 경우 (ex: 게시글 리스트 페이지) 내가 원하는 게시글을 마우스로 클릭하려고 마우스 쭉 움직일 때 onMouseEnter()가 쭉 실행되면 매우 곤란해짐
 */
export default function CustomLink({prefetch, href, ...rest}: CustomLinkProps) {
  const router = useRouter();
  const shouldEnablePrefetch = prefetch === undefined && typeof href === 'string';

  const onMouseEnter = useCallback(() => {
    if (typeof href === 'string') {
      router.prefetch(href);
    }
  }, [href, router]);
  
  return (
    <Link prefetch={prefetch} onMouseEnter={shouldEnablePrefetch ? onMouseEnter : undefined} href={href} {...rest}/>
  );
}
