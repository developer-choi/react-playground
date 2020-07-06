import React from "react";
import "./Timer.scss";

export default function Timer() {

  return (
      <div className="Timer-wrap">
        <div className="time-wrap">
          <span>00:00:00</span>
        </div>
        <div className="button-wrap">
          <button>시작</button>
          <button>일시정지</button>
          <button>+30</button>
          <button>-30</button>
        </div>
      </div>
  );
}
