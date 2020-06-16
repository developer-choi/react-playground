import * as React from "react";
import reactRoutes from "../../route/react/reactRoutes";
import cssRoutes from "../../route/css/cssRoutes";
import {Route, Switch} from "react-router-dom";
import errorRoutes from "../../route/error/errorRoutes";

export default function AppMain() {

    const routes = reactRoutes.concat(cssRoutes, errorRoutes);

    return (
        <div className="AppMain-wrap">
            <Switch>
                {routes.map(route => <Route key={`route-${route.path}`} {...route}/>)}
            </Switch>
        </div>
    );
}
