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
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export default function MyApp(props: AppProps) {
  if ('notifyRedirect' in props.pageProps) {
    const {notifyRedirect} = props.pageProps as NotifyRedirectProps;
    return <NotifyRedirect notifyRedirect={notifyRedirect}/>;
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

const queryClient = new QueryClient();

function InnerApp({Component, pageProps}: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkRefreshSetUser());
  }, [dispatch]);

  const Layout = 'layout' in Component ? (Component as any).layout : null;

  //https://github.com/styled-components/styled-components/issues/3738
  const ThemeProviderProxy: any = ThemeProvider;
  const GlobalStyleProxy: any = GlobalStyle;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderProxy theme={theme}>
        <GlobalStyleProxy/>
        {Layout === null ? (
          <Component {...pageProps}/>
        ) : (
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        )}
      </ThemeProviderProxy>
    </QueryClientProvider>
  );
}
