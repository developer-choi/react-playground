import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from "./components/layout/Layout";
import {Provider} from "react-redux";
import {store} from "./redux/store";

import "./components/layout/reset.css";
import "./containers/css/cssPropertiesClass.scss";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/public">
                </Route>
                <Layout/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
