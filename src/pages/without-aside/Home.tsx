import React from 'react';
import {Link} from 'react-router-dom';
import './Home.scss';

export default function Home() {

  return (
      <div className="Home-wrap">
        <div className="top-wrap">
          <span className="title">React</span>
          <span className="content">사용자 인터페이스를 만들기 위한 JavaScript 라이브러리</span>
          <Link to="/doc">시작하기</Link>
        </div>
      </div>
  );
}
