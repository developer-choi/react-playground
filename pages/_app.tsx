import React, {useCallback} from 'react';
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
import {QueryClient, QueryClientProvider, Hydrate, DehydratedPageProps} from '@tanstack/react-query';
import {closeModal} from '@store/reducers/modal';
import PageLoadingLayer from "@component/molecules/layer/PageLoadingLayer";

export type PageProp = DehydratedPageProps & NotifyRedirectProps;

export default function App(props: AppProps<PageProp>) {
  if (EMPTY_PATHNAMES.some(pathname => props.router.pathname.includes(pathname))) {
    return (
      <props.Component {...props.pageProps}/>
    )
  }

  return (
    <Provider store={store}>
      <RealApp {...props}/>
    </Provider>
  );
}

function RealApp(props: AppProps<PageProp>) {
  const visibleLoadingLayer = useAppSelector(state => state.loadingLayer.visible);

  return (
    <QueryClientProvider client={QUERY_CLIENT_INSTANCE}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <ThemeProviderProxy theme={theme}>
          <GlobalStyleProxy/>
          <PageComponent {...props}/>
          <ModalRender/>
          {!visibleLoadingLayer ? null : (
            <PageLoadingLayer/>
          )}
          <ToastContainer/>
        </ThemeProviderProxy>
      </Hydrate>
    </QueryClientProvider>
  );
}

const EMPTY_PATHNAMES: string[] = ['sns-callback', 'nice-callback', 'etc-callback'];

export const QUERY_CLIENT_INSTANCE = new QueryClient();

//https://github.com/styled-components/styled-components/issues/3738
const ThemeProviderProxy: any = ThemeProvider;
const GlobalStyleProxy: any = GlobalStyle;

//어떤 컴포넌트를 렌더링하더라도, GlobalStyle을 적용받아야하므로 별도로 분리.
function PageComponent({Component, pageProps}: AppProps<PageProp>) {
  const Layout = 'layout' in Component ? (Component as any).layout : null;

  if (pageProps.notifyRedirect) {
    return <NotifyRedirect notifyRedirect={pageProps.notifyRedirect}/>;
  }

  if(Layout === null) {
    return (
      <Component {...pageProps}/>
    );
  }

  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
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
