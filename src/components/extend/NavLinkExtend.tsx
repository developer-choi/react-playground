import React from 'react';
import {NavLink, NavLinkProps, useLocation} from 'react-router-dom';
import classNames from 'classnames';

export interface NavLinkExtendProp extends NavLinkProps {
  activePath?: string;
}

export default function NavLinkExtend({activePath, className, exact = true, ...rest}: NavLinkExtendProp) {

  const {pathname} = useLocation();
  const linkClass = classNames({active: activePath && pathname.startsWith(activePath)}, className);

  return (
      <NavLink className={linkClass} exact={exact} {...rest}/>
  );
}
