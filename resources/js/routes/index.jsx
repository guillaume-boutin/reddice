import React from 'react';
import { Route, Switch } from 'react-router';
import App from '../components/App';

export default () => {
    return (
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    );
};