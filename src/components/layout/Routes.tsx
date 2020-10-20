import React from 'react';
import {Route, Switch} from 'react-router-dom';
import WithoutAsideLayout from './WithoutAsideLayout';
import Home from '../../pages/without-aside/Home';
import WithAsideLayout from './WithAsideLayout';
import AllAnimationPage from '../../pages/style/AllAnimationPage';
import {ALL_ANIMATION_PATH, FIRST_DIR} from '../../utils/route';

export default function Routes() {

  return (
      <Switch>
        <Route path={ALL_ANIMATION_PATH} exact>
          <WithAsideLayout>
            <AllAnimationPage/>
          </WithAsideLayout>
        </Route>
        <Route path={FIRST_DIR.style}>
          <WithAsideLayout>
            <AllAnimationPage/>
          </WithAsideLayout>
        </Route>
        <Route>
          <WithoutAsideLayout>
            <Home/>
          </WithoutAsideLayout>
        </Route>
      </Switch>
  );
}
