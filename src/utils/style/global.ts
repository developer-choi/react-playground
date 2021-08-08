import {createGlobalStyle, css} from 'styled-components';
import {reset} from './my-reset';

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
`;

export const GlobalStyle = createGlobalStyle`
  ${reset};
  ${font};
  ${layout};
  
  body {
    background-color: white;
  }
`;
