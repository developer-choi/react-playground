import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../../pages/without-aside/Home';
import WithoutAsideLayout from './WithoutAsideLayout';

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
