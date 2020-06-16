import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Layout from "./components/layout/Layout";
import {Provider} from "react-redux";
import {store} from "./redux/store";

import "./components/layout/reset.css";
import "./containers/css/cssPropertiesClass.scss";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
