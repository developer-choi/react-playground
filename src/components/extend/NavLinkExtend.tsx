import React from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';
import classNames from 'classnames';
import {useIsActivePath} from '../../utils/custom-hooks/useIsActivePath';

export interface NavLinkExtendProp extends NavLinkProps {
  activePath?: string;
}

export default function NavLinkExtend({activePath, className, exact = true, ...rest}: NavLinkExtendProp) {

  const active = useIsActivePath(activePath);
  const linkClass = classNames({active}, className);

  return (
      <NavLink className={linkClass} exact={exact} {...rest}/>
  );
}
