import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {

  const onlyForMe = `
이것은, 오직 저 한명만을 위해 만들어진 웹사이트 입니다.
1. 지식을 공부하기위해 직접 만든 예제와 버그가 재현된 예제가 들어있습니다.
2. 웹 개발에 대한 저의 주장 + 근거가 담겨있습니다. 텍스트는 이래야한다. 모달은 저래야한다. 입력박스는 이렇게 만드는게 좋다.

# 이 사이트를 활용하는 방법
1. [Git링크]로 프로젝트를 다운받고 실행시킨 다음, 웹페이지마다 있는 예제와 지식을 직접 구현해보세요.
2. 그 다음, 기존에 구현된 예제와 서로 비교하고 분석하세요.

(1) 복습은 눈으로 읽는 것보다, 손으로 구현해보는 것이 더 좋습니다.
(2) 과거에 어떻게 구현했었는지 까먹어도 전혀 상관없습니다. 현재 실력으로 더 잘 구현하면 되니까요. 
`;

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
