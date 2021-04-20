import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Aside from './components/Aside';
import {AllLayoutWrap} from './components/LayoutWrap';

export default function MainLayout({children}: PropsWithChildren<{}>) {
  
  return (
      <AllLayoutWrap>
        <Header/>
        <Center>
          <Aside/>
          <AppMain>
            {children}
          </AppMain>
        </Center>
      </AllLayoutWrap>
  );
}

const Center = styled.div`
  display: flex;
  margin-top: 15px;
`;

const AppMain = styled.div`
  flex-grow: 1;
`;
