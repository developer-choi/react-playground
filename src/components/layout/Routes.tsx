import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../../pages/without-aside/Home';

export default function Routes() {

  return (
      <Switch>
        <Route>
            <Home/>
        </Route>
      </Switch>
  );
}
