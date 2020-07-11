import React, {PropsWithChildren} from 'react';
import Section from './Section';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWithoutAside({children}: PropsWithChildren<{}>) {

  return (
      <>
        <Header/>
        <Section>
          {children}
        </Section>
        <Footer/>
      </>
  );
}
