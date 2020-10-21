import {createGlobalStyle, css} from 'styled-components';
import styledReset from 'styled-reset';

const reset = css`
  ${styledReset};
  
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
  
  b, h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }
  
  a {
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
  }
  
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
