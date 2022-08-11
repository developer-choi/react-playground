import React from 'react';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {theme} from '@util/style/theme';
import {GlobalStyle} from '@util/style/global';
import Head from 'next/head';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {store} from '@store/store';
import OgMeta from '@component/atom/OgMeta';
import TwitterMeta from '@component/atom/TwitterMeta';
import NotifyRedirect, {NotifyRedirectProps} from '@component/atom/NotifyRedirect';

export default function MyApp({Component, pageProps}: AppProps) {

  if (pageProps.notifyRedirect) {
    return <NotifyRedirect notifyRedirect={pageProps.notifyRedirect as NotifyRedirectProps['notifyRedirect']}/>
  }

  return (
    <>
      <Head>
        <title>react-playground</title>
      </Head>
      <OgMeta
        title="React Playground"
        image="/images/next-logo.png"
        description="This project is for learning React and its environments."
      />
      <TwitterMeta
        cardType="summary_large_image"
        title="React Playground"
        image="/images/next-logo.png"
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
