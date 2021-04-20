import React from 'react';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {theme} from '../src/utils/style/theme';
import {GlobalStyle} from '../src/utils/style/global';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Component {...pageProps}/>
      </ThemeProvider>
  );
}
