import {css} from 'styled-components';

const InputTypeSearchHidden = css`
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

const InputTypeNumberHidden = css`
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const MyReset = css`
  ${InputTypeSearchHidden};
  ${InputTypeNumberHidden};
  
  * {
    padding: 0; //styled-reset의 button에 빠져있음
    border: none;
    background-color: transparent;  
    box-sizing: border-box;
    
    //font-size: inherit; 어떤 이유로 추가헀었는지 기억이 안나서 주석처리했음. 버그상황 확보되면 그 때 필기.
    //margin: 0; 어떤 이유로 추가헀었는지 기억이 안나서 주석처리했음. 버그상황 확보되면 그 때 필기.
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
  }
  
  button {
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
