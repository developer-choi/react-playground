import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {

  return (
      <HeaderStyle>
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
      </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  height: 60px;
  background: #20232a;
  color: white;

  .inner-wrap {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
  }

  .nav-link {

    font-size: 18px;
    color: white;

    &.active, &:hover {
      color: rgb(97, 218, 251);
    }

    &:not(:last-child) {
      margin-right: 50px;
    }
  }
`;
