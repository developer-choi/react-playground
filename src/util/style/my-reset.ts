import {css} from 'styled-components';

const inputTypeSearchHidden = css`
  input::-ms-clear,
  input::-ms-reveal {
    display:none;width:0;height:0;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display:none;
  }
`;

const inputTypeNumberHidden = css`
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const font = css`
  //body에서 font-size를 지정하더라도, 나머지 태그들은 상속이 아니라 태그 자체에 font-size속성이 선언되어있기 때문에, 이렇게 지정해야 모든 엘레먼트의 폰트사이즈가 의도대로 초기화된다.
  body, input, textarea, button {
    font-size: 13px;
  }
`;

export const myReset = css`
  ${inputTypeSearchHidden};
  ${inputTypeNumberHidden};
  ${font};
  
  * {
    padding: 0; //styled-reset의 button에 빠져있음
    border: none;
    background-color: transparent;
    box-sizing: border-box;
    margin: 0; // input type radio에 적용되어있는 기본 마진값을 reset하는 코드가 styled-reset에 빠져있음.

    //font-size: inherit; 어떤 이유로 추가헀었는지 기억이 안나서 주석처리했음. 버그상황 확보되면 그 때 필기.
    //margin: 0; 어떤 이유로 추가헀었는지 기억이 안나서 주석처리했음. 버그상황 확보되면 그 때 필기.
  }
  
  a {
    //NextJS에서는 Link로 링크를 만드는경우, a태그에 href속성이 전달되지않아 cursor가 pointer로 되지않더라
    cursor: pointer;
  }

  table {
    width: 100%;
    table-layout: fixed;

    //td { 직접 셀마다 길어짐 대비를 하는것이 맞다. 오히려 셀 안에서 position absolute 자식이 안보이는 경우가 있더라. (툴팁 등)
    //  overflow: hidden;
    //}
  }

  td {
    //styled-reset에 td가 vertical-align baseline 설정되있는데, 테이블 셀은 middle이 더 이쁘고 오히려 baseline이 이상하다.
    vertical-align: middle;
  }

  b, h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: inherit; //이거 안하면 크롬에서 방문한링크 보라색나오고 방문안한거 파란색으로 나옴
  }

  button, select {
    cursor: pointer;
  }

  input, button {
    &:disabled {
      cursor: not-allowed;
    }
  }

  textarea {
    resize: none;
  }
`;
