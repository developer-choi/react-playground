import React, {PropsWithChildren} from 'react';
import Header from './Header';
import Section from './Section';

export default function WithoutAsideLayout({children}: PropsWithChildren<{}>) {

  return (
      <>
        <Header/>
        <Section>
          {children}
        </Section>
      </>
  );
}
