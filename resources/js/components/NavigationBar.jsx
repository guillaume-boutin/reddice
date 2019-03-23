import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
    render () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Red Dice</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="signup">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
};