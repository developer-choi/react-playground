import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.scss';

export default function Header() {

  return (
      <header className="Header-wrap">
        <div className="inner-wrap">
          <div>
            <NavLink exact className="nav-link" to="/">React</NavLink>
            <NavLink className="nav-link" to="/doc">Doc</NavLink>
            <NavLink className="nav-link" to="/api">Api</NavLink>
          </div>
          <div>
            <span className='nav-link'>v16.13.1</span>
            <span className='nav-link'>languages</span>
            <span className='nav-link'>GitHub</span>
          </div>
        </div>
      </header>
  );
}
