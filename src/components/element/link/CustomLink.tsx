import Link, {LinkProps} from 'next/link';
import React, {CSSProperties, PropsWithChildren} from 'react';

export interface CustomLinkProps extends PropsWithChildren<LinkProps> {
  style?: CSSProperties;
  className?: string;
}

/**
 * Original : https://github.com/developer-choi/react-playground/commit/80891494f84e1c93c42fb01428d1dbee98133601#diff-c5022c9c2a2b3525d5b37b200fb8fea5c4ea7b1775ac34558c227a5267fdd99f
 */
export default function CustomLink({prefetch = false, ...rest}: CustomLinkProps) {
  return (
    <Link prefetch={prefetch} {...rest}/>
  );
}
