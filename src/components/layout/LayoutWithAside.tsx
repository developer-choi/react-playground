import React from 'react';
import Header from './Header';
import AppMain from './AppMain';
import {Route, Switch} from 'react-router';
import aside from '../../routes/aside';
import Aside from './Aside';
import appMain from '../../routes/app-main/appMain';
import Footer from './Footer';
import styled from 'styled-components';

export default function LayoutWithAside() {

  return (
      <>
        <Header/>
        <SectionStyle>
          <AppMain>
            <Switch>
              {appMain.map((route, index) => (
                  <Route key={`aside-route-${index}`} {...route}/>
              ))}
            </Switch>
          </AppMain>
          <Aside>
            <Switch>
              {aside.map((route, index) => (
                  <Route key={`aside-route-${index}`} {...route}/>
              ))}
            </Switch>
          </Aside>
        </SectionStyle>
        <Footer/>
      </>
  );
}

const SectionStyle = styled.section`
  display: flex;
  flex-grow: 1;
`;
