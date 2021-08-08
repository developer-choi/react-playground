import {createGlobalStyle, css} from 'styled-components';
import styledReset from 'styled-reset';
import {myReset} from './my-reset';

const reset = css`
  ${styledReset};
  ${myReset}; //styled-reset보다 my-reset이 우선 적용되야하므로 밑에와야한다.
`;

const font = css`

  // @font-face {
  //   font-family: KoreanFont2;
  //   src: url(...);
  // }

  body {
    font-family: "Malgun Gothic", "맑은 고딕", helvetica, "Apple SD Gothic Neo", sans-serif;
    font-size: 15px;
  }
`;

const layout = css`
  
  html, body, #__next {
    height: 100%;
  }
  
  body {
    background-color: white;
    //background-color: #04caf4; 전체 배경색 지정할일이 있거나
    //color: black; 기본 색상을 지정할 일이 있거나,
    //font-size: 14px; 기본 폰트 크기를 좀 줄이고싶을 때.
  }
`;

export const GlobalStyle = createGlobalStyle`

  ${reset};
  ${font};
  ${layout};
`;
