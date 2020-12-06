import React from 'react';
import {Link, LinkProps} from 'react-router-dom';
import classNames from 'classnames';
import {useIsActivePath} from '../../utils/custom-hooks/useIsActivePath';

export interface LinkExtendProp extends LinkProps {
  activePath?: string;
}

export default function LinkExtend({activePath, className, ...rest}: LinkExtendProp) {

  const active = useIsActivePath(activePath);
  const linkClass = classNames({active}, className);

  return (
      <Link className={linkClass} {...rest}/>
  );
}
