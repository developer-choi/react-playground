import React, {useEffect} from 'react';
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
import {useAppDispatch} from '@store/hooks';
import {thunkRefreshSetUser} from '@store/reducers/user';

export default function MyApp(props: AppProps) {
  if (props.pageProps.notifyRedirect) {
    return <NotifyRedirect notifyRedirect={props.pageProps.notifyRedirect as NotifyRedirectProps['notifyRedirect']}/>
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
        <InnerApp {...props}/>
      </Provider>
      <ToastContainer/>
    </>
  );
}

function InnerApp({Component, pageProps}: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkRefreshSetUser());
  }, [dispatch]);

  const Layout = 'layout' in Component ? (Component as any).layout : null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      {Layout === null ? (
        <Component {...pageProps}/>
      ) : (
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      )}
    </ThemeProvider>
  );
}
