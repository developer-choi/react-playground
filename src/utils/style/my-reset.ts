import {css} from 'styled-components';

const inputTypeSearchHidden = css`
  input::-ms-clear,
  input::-ms-reveal {
    display:none;
    width:0;
    height:0;
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

export const reset = css`
  *:not(style, script, head) {
    all: unset;
  }
  
  ${inputTypeSearchHidden};
  ${inputTypeNumberHidden};
  
  * {
    box-sizing: border-box;
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
`;
