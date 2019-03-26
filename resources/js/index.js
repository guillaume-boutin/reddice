import './bootstrap';
// import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import Routes from './routes';

const browserHistory = createBrowserHistory();

const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
)

render(
<Provider store={store}>
    <Router history={browserHistory}>
        <Routes />
    </Router>
</Provider>,
document.getElementById('app'));