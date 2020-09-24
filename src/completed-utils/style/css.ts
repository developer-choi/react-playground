import {css} from 'styled-components';

export const myReset = css`
  * {
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
    font-size: inherit;
  }
  
  b, h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }
  
  table {
    width: 100%;
    table-layout: fixed;
    //border-spacing: 0; styled-reset에 있음
    //border-collapse: collapse; styled-reset에 있음
  }
  
  a {
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }
  
  html, body, #root {
    height: 100%;
  }
`;

export const FlexDirectionRowCss = css`
  display: flex;
`;

export const backgroundImageCss = css`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
