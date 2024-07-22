import Link, {LinkProps} from 'next/link';
import React, {CSSProperties, PropsWithChildren} from 'react';

export interface CustomLinkProps extends PropsWithChildren<LinkProps> {
  style?: CSSProperties;
  className?: string;
}

/**
 * 모든 종류의 링크에 적용되야하는 기능만 추가
 */
export default function CustomLink({prefetch = false, ...rest}: CustomLinkProps) {
  return (
    <Link prefetch={prefetch} {...rest}/>
  );
}
