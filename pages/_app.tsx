import React from 'react';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {theme} from '../src/utils/style/theme';
import {GlobalStyle} from '../src/utils/style/global';
import Head from 'next/head';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {store} from '../src/store/store';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
      <>
        <Head>
          <title>react-library</title>
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Component {...pageProps}/>
          </ThemeProvider>
        </Provider>
        <ToastContainer/>
      </>
  );
}
