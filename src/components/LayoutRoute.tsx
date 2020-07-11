import React from 'react';
import {Route, RouteProps} from 'react-router';

export interface LayoutRouteProp extends RouteProps {
  component: React.ComponentType;
  layout: React.ComponentType;
}

export default function LayoutRoute({layout: Layout, component: Component, ...rest}: LayoutRouteProp) {

  return (
      <Route {...rest}>
        <Layout>
          <Component/>
        </Layout>
      </Route>
  );
}
