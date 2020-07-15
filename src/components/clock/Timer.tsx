import React from "react";
import styled from 'styled-components';

export default function Timer() {

  return (
      <TimerStyle>
        <div className="time-wrap">
          <span>00:00:00</span>
        </div>
        <div className="button-wrap">
          <button>시작</button>
          <button>일시정지</button>
          <button>+30</button>
          <button>-30</button>
        </div>
      </TimerStyle>
  );
}

const TimerStyle = styled.div`
  width: 450px;
  background: whitesmoke;
  padding: 20px;

  .time-wrap {
    text-align: center;
  }

  span {
    display: block;
    width: 100%;
    height: 100%;
    padding: 20px 0;
    font-size: 50px;
    font-weight: bold;
    background: lightgray;
  }

  .button-wrap {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;

    button {
      background: gray;
      color: white;
      font-size: 20px;
      border-radius: 10px;
      padding: 10px 20px;
    }
  }
`;
