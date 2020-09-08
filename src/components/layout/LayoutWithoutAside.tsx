import React, {PropsWithChildren} from 'react';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWithoutAside({children}: PropsWithChildren<{}>) {

  return (
      <>
        <Header/>
        {children}
        <Footer/>
      </>
  );
}
