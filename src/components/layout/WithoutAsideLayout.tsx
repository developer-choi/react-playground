import React, {PropsWithChildren} from 'react';
import {LayoutSection} from '../styled/sections';
import Header from './Header';

export default function WithoutAsideLayout({children}: PropsWithChildren<{}>) {

  return (
      <>
        <Header/>
        <LayoutSection>
          {children}
        </LayoutSection>
      </>
  );
}
