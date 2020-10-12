import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Switch} from 'react-router';
import withoutAside from './routes/withoutAside';
import appMain from './routes/app-main/appMain';
import LayoutRoute from './components/LayoutRoute';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {theme} from './utils/style/theme';
import {reset} from 'styled-reset';

const GlobalStyle = createGlobalStyle`

  ${reset}
  
  * {
    padding: 0; //styled-reset의 button에 빠져있음
    background-color: transparent;  
    border: none;
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
  }

  html, body, #root {
    height: 100%;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }
  
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
    Helvetica 
    Neue,
    sans-serif;
  }
`;

const routes = appMain.concat(withoutAside);

ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle/>
          <Switch>
            {routes.map((route, index) => (
                <LayoutRoute key={`route-${index}`} {...route}/>
            ))}
          </Switch>
        </>
      </ThemeProvider>
    </BrowserRouter>
    , document.getElementById('root')
);
