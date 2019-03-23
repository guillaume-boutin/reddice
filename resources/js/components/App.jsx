import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import NavigationBar from './NavigationBar';
import Greetings from './Greetings';
import Signup from './Signup';

export default class App extends Component {
    render () {
        return (
            <div className="container">
                <NavigationBar />

                <Switch>
                    <Route exact path="/" component={Greetings} />
                    <Route path="/signup" component={Signup} />
                </Switch>
            </div>
        )
    }
}