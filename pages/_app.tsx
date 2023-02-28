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
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {closeModal} from '@store/reducers/modal';

export default function MyApp(props: AppProps) {
  if ('notifyRedirect' in props.pageProps) {
    const {notifyRedirect} = props.pageProps as NotifyRedirectProps;
    return <NotifyRedirect notifyRedirect={notifyRedirect}/>;
  }

  return (
    <>
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
        <ModalRender/>
      </ThemeProviderProxy>
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
