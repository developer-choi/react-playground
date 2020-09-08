import React, {PropsWithChildren} from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

export default function LayoutWithoutAside({children}: PropsWithChildren<{}>) {

  return (
      <>
        <Header/>
        <SectionStyle>
          {children}
        </SectionStyle>
        <Footer/>
      </>
  );
}

const SectionStyle = styled.section`
  flex-grow: 1;
`;
