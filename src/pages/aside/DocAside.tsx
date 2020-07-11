import React from 'react';
import {NavLink} from 'react-router-dom';
import {useLocation} from 'react-router';

export default function DocAside() {

  const firstNavLinkActive = useLocation().pathname === '/doc';

  return (
      <div className="DocAside-wrap">
        <ul>
          <li><NavLink exact className={`link ${firstNavLinkActive ? 'active' : ''}`} to="/doc/hello-world">시작하기 링크</NavLink></li>
          <li><NavLink exact className="link" to="/doc/introducing-jsx">JSX 소개 링크</NavLink></li>
        </ul>
      </div>
  );
}
