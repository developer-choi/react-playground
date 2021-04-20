import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import {AllLayoutWrap} from './components/LayoutWrap';

export default function MainLayout({children}: PropsWithChildren<{}>) {
  
  return (
      <AllLayoutWrap>
        <Header/>
        <Center>
          <AppMain>
            <Aside/>
            {children}
          </AppMain>
        </Center>
        <Footer/>
      </AllLayoutWrap>
  );
}

const Center = styled.div`
`;

const AppMain = styled.div`
`;
