import './bootstrap';
// import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import Routes from './routes';

const browserHistory = createBrowserHistory();

render(
<Router history={browserHistory}>
    <Routes />
</Router>,
document.getElementById('app'));