import React from 'react';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {theme} from '../src/utils/style/theme';
import {GlobalStyle} from '../src/utils/style/global';
import Head from 'next/head';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
      <>
        <Head>
          <title>react-library</title>
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <Component {...pageProps}/>
        </ThemeProvider>
        <ToastContainer/>
      </>
  );
}
