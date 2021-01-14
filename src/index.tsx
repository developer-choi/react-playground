import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {theme} from './utils/style/theme';
import Routes from './components/layout/Routes';
import {GlobalStyle} from './utils/style/global';
import {Provider} from 'react-redux';
import {store} from './store/store';

ReactDOM.render(
    // <BrowserRouter basename="/react-library">
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <Routes/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
