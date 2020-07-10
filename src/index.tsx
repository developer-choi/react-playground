import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import "./components/layout/reset.css";
import "./containers/css/cssPropertiesClass.scss";

ReactDOM.render(
    <BrowserRouter>
    </BrowserRouter>,
    document.getElementById("root")
);
