import {RouteProps, useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import React from 'react';

export interface AsideNavLinksProp {
  firstPath: string;
  routes: RouteProps[];
}

export default function AsideNavLinks({firstPath, routes}: AsideNavLinksProp) {

  const firstNavLinkActive = useLocation().pathname === firstPath;

  return (
      <>
        {routes.map((route, index) => {

          if(! route.path) return;

          const defaultPathname = typeof route.path === 'string' ? route.path : route.path[route.path.length - 1];

          if (index === 0) {
            return <NavLink key={`nav-link-${index}`} exact className={`link ${firstNavLinkActive ? 'active' : ''}`} to={defaultPathname}>{lastIndexSlice(defaultPathname)}</NavLink>;

          } else {
            return <NavLink key={`nav-link-${index}`} exact className="link" to={defaultPathname}>{lastIndexSlice(defaultPathname)}</NavLink>;
          }
        })}
      </>
  );
}

function lastIndexSlice(pathname: string) {
  return pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length);
}
