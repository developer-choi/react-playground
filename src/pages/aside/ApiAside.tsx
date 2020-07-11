import React from 'react';
import {NavLink} from 'react-router-dom';
import {useLocation} from 'react-router';

export default function ApiAside() {

  const firstNavLinkActive = useLocation().pathname === '/api';

  return (
      <div className="ApiAside-wrap">
        <ul>
          <li><NavLink exact className={`link ${firstNavLinkActive ? 'active' : ''}`} to="/api/use-effect">UseEffect 링크</NavLink></li>
          <li><NavLink exact className="link" to="/api/use-state">UseState 링크</NavLink></li>
        </ul>
      </div>
  );
}
