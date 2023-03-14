import React, {useCallback, useEffect} from 'react';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {theme} from '@util/services/style/theme';
import {GlobalStyle} from '@util/services/style/global';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {store} from '@store/store';
import NotifyRedirect, {NotifyRedirectProps} from '@component/atom/NotifyRedirect';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {thunkRefreshSetUser} from '@store/reducers/user';
import {QueryClient, QueryClientProvider, Hydrate, DehydratedPageProps} from '@tanstack/react-query';
import {closeModal} from '@store/reducers/modal';

export type PageProp = DehydratedPageProps & NotifyRedirectProps;

export default function MyApp(props: AppProps<PageProp>) {
  return (
    <Provider store={store}>
      <ReduxInnerApp {...props}/>
    </Provider>
  );
}

export const QUERY_CLIENT_INSTANCE = new QueryClient();

function ReduxInnerApp({Component, pageProps}: AppProps<PageProp>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkRefreshSetUser());
  }, [dispatch]);

  const Layout = 'layout' in Component ? (Component as any).layout : null;

  //https://github.com/styled-components/styled-components/issues/3738
  const ThemeProviderProxy: any = ThemeProvider;
  const GlobalStyleProxy: any = GlobalStyle;

  if (pageProps.notifyRedirect) {
    return <NotifyRedirect notifyRedirect={pageProps.notifyRedirect}/>;
  }

  return (
    <QueryClientProvider client={QUERY_CLIENT_INSTANCE}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProviderProxy theme={theme}>
          <GlobalStyleProxy/>
          {Layout === null ? (
            <Component {...pageProps}/>
          ) : (
            <Layout>
              <Component {...pageProps}/>
            </Layout>
          )}
          <ModalRender/>
          <ToastContainer/>
        </ThemeProviderProxy>
      </Hydrate>
    </QueryClientProvider>
  );
}

function ModalRender() {
  const modals = useAppSelector(state => state.modal.modals);
  const dispatch = useAppDispatch();

  const close = useCallback((pk: number) => {
    dispatch(closeModal(pk));
  }, [dispatch]);

  return (
    <>
      {modals.map(({pk, Component, props}) => (
        <Component key={pk} closeModal={() => close(pk)} {...props}/>
      ))}
    </>
  );
}
