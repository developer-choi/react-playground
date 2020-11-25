import React from 'react';
import {Link, LinkProps, useLocation} from 'react-router-dom';
import classNames from 'classnames';

export interface LinkExtendProp extends LinkProps {
  activePath?: string;
}

export default function LinkExtend({activePath, className, ...rest}: LinkExtendProp) {

  const {pathname} = useLocation();
  const linkClass = classNames({active: activePath && pathname.startsWith(activePath)}, className);

  return (
      <Link className={linkClass} {...rest}/>
  );
}
