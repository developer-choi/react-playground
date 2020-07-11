import React from 'react';
import Header from './Header';
import Section from './Section';
import AppMain from './AppMain';
import {Switch, Route} from 'react-router';
import aside from '../../routes/aside';
import Aside from './Aside';
import appMain from '../../routes/app-main/appMain';
import Footer from './Footer';

export default function Layout() {

  return (
      <>
        <Header/>
        <Section>
          <Aside>
            <Switch>
              {aside.map((route, index) => (
                  <Route key={`aside-route-${index}`} {...route}/>
              ))}
            </Switch>
          </Aside>
          <AppMain>
            <Switch>
              {appMain.map((route, index) => (
                  <Route key={`aside-route-${index}`} {...route}/>
              ))}
            </Switch>
          </AppMain>
        </Section>
        <Footer/>
      </>
  );
}
