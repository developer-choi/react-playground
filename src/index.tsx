import '@babel/polyfill';
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {theme} from './utils/style/theme';
import {GlobalStyle} from './utils/style/global';
import {Provider} from 'react-redux';
import {store} from './store/store';
import WorldMapExample from './pages/examples/libraries/react-simple-maps/WorldMapExample';

ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <WorldMapExample/>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
    , document.getElementById('root')
);
