import {createGlobalStyle, css} from 'styled-components';
import StyledReset from 'styled-reset';
import {MyReset} from './my-reset';

const reset = css`
  ${StyledReset};
  ${MyReset}; //styled-reset보다 my-reset이 우선 적용되야하므로 밑에와야한다.
`;

const font = css`

  // @font-face { 
  //   font-family: KoreanFont2;
  //   src: url(...);
  // } 
  
  body {
    font-family: -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
  }
`;

const layout = css`
  
  html, body, #root {
    height: 100%;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }
`;

export const GlobalStyle = createGlobalStyle`

  ${reset};
  ${font};
  ${layout};
  
  a {
    // anchor color를 어떻게 지정할지 모르겠다. 하위 모든 앵커들마다 :visit, :hover, 기본에 대해 색상을 쉽게 컨트롤하고싶다.
    color: ${props => props.theme.colors.black};
  }
  
  body {
    background-color: white;
    //background-color: #04caf4; 전체 배경색 지정할일이 있거나
    //color: black; 기본 색상을 지정할 일이 있거나,
    //font-size: 14px; 기본 폰트 크기를 좀 줄이고싶을 때.
  }
`;
