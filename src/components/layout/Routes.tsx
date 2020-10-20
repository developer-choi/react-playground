import React from 'react';
import {Route, Switch} from 'react-router-dom';
import WithoutAsideLayout from './WithoutAsideLayout';
import Home from '../../pages/without-aside/Home';

export default function Routes() {

  return (
      <Switch>
        <Route>
          <WithoutAsideLayout>
            <Home/>
          </WithoutAsideLayout>
        </Route>
      </Switch>
  );
}
