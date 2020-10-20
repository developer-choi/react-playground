import React, {PropsWithChildren} from 'react';
import Header from './Header';
import WithAsideSection from './WithAsideSection';

export default function WithAsideLayout({children}: PropsWithChildren<{}>) {

  return (
      <>
        <Header/>
        <WithAsideSection>
          {children}
        </WithAsideSection>
      </>
  );
}
