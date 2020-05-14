import * as React from "react";
import {Route, Switch} from "react-router-dom";
import reactRoutes from "./react/reactRoutes";
import cssRoutes from "./css/cssRoutes";

const routes = reactRoutes.concat(cssRoutes);

export default function Routes() {

    return (
        <Switch>
            {routes.map(route => <Route key={`route-${route.path}`} {...route}/>)}
        </Switch>
    );
};
