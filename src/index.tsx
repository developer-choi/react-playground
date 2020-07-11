import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './reset.css';
import {Switch} from 'react-router';
import withoutAside from './routes/withoutAside';
import appMain from './routes/app-main/appMain';
import LayoutRoute from './components/LayoutRoute';

const routes = appMain.concat(withoutAside);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {routes.map((route, index) => (
                <LayoutRoute key={`route-${index}`} {...route}/>
            ))}
        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
);
