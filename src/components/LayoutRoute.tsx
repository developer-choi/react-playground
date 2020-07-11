import React from 'react';
import {Route, RouteProps} from 'react-router';

export interface LayoutRouteProps extends RouteProps {
  component: React.ComponentType;
  layout: React.ComponentType;
}

export default function LayoutRoute({layout: Layout, component: Component, ...rest}: LayoutRouteProps) {

  return (
      <Route {...rest}>
        <Layout>
          <Component/>
        </Layout>
      </Route>
  );
}
