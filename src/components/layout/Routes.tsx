import React from 'react';
import {Route, Switch} from 'react-router-dom';
import WhiteBoardPage from '../../pages/without-aside/WhiteBoardPage';

export default function Routes() {
  
  return (
      <Switch>
        <Route>
          <WhiteBoardPage/>
        </Route>
      </Switch>
  );
}
