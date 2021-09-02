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
import OgMeta from '@components/atom/OgMeta';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
      <>
        <Head>
          <title>react-playground</title>
        </Head>
        <OgMeta
          title="React Playground"
          image="/images/react-logo.png"
          description="This project is for learning React and its environments."
        />
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
