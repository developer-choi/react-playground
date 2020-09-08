import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {

  return (
      <HomeStyle>
        <div className="top-wrap">
          <span className="title">React</span>
          <span className="content">사용자 인터페이스를 만들기 위한 JavaScript 라이브러리</span>
          <Link to="/doc">시작하기</Link>
        </div>
      </HomeStyle>
  );
}

const HomeStyle = styled.div`
  width: 100%;
  height: 400px;
  background: ${props => props.theme.colors.lightBlack};
  padding-top: 50px;
  padding-bottom: 100px;

  .top-wrap {

    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      display: block;
      margin-top: 25px;
    }

    .title {
      font-size: 45px;
      color: ${props => props.theme.colors.reactBlue};
      font-weight: bold;
    }

    .content {
      font-size: 25px;
      color: white;
    }

    a {
      padding: 10px 30px;
      background: ${props => props.theme.colors.reactBlue};
      font-size: 25px;
    }
  }
`;
