import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../../components/basic/BasicButton';
import ConfirmModal from '../../components/basic-extends/ConfirmModal';

export default function Home() {

  const [visible, setVisible] = useState(false);

  return (
      <HomeStyle>
        <div className="top-wrap">
          <span className="title">React</span>
          <span className="content">사용자 인터페이스를 만들기 위한 JavaScript 라이브러리</span>
          <Link to="/doc">시작하기</Link>
          <BasicButton onClick={() => setVisible(prevState => !prevState)}>모달</BasicButton>
        </div>
        <ConfirmModal onConfirm={() => {}} content="Hello World" visible={visible} setVisible={setVisible}/>
      </HomeStyle>
  );
}

const HomeStyle = styled.div`
  width: 100%;
  height: 400px;
  background: rgb(40, 44, 52);
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
      color: rgb(97, 218, 251);
      font-weight: bold;
    }

    .content {
      font-size: 25px;
      color: white;
    }

    a {
      padding: 10px 30px;
      background: rgb(97, 218, 251);
      font-size: 25px;
    }
  }
`;
