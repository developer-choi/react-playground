import '@babel/polyfill';
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {theme} from './utils/style/theme';
import {GlobalStyle} from './utils/style/global';
import {Provider} from 'react-redux';
import {store} from './store/store';
import CardAnimationExample1 from './pages/examples/animation/card1/CardAnimationExample1';

ReactDOM.render(
    <StrictMode>
      {/*<BrowserRouter basename="/react-library">*/}
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <CardAnimationExample1/>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
    , document.getElementById('root')
);
