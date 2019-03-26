import { Component } from 'react';
import PropTypes from 'prop-types';
import timezones from '../data/timezones';
import _map from 'lodash/map';

class SignupForm extends Component {
    constructor (props) {
        super(props);

        this.computeState(props);
        this.bindMethods();
    }

    computeState (props) {
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            timezone: ''
        };
    }

    bindMethods () {
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit (e) {
        e.preventDefault();
        this.props.userSignupRequest(this.state);
    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                <div className="form-group">
                    <label htmlFor="username" className="control-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="control-label">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="control-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password_confirmation" className="control-label">Password Confirmation</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        className="form-control"
                        onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="timezone" className="control-label">Timezone</label>
                    <select
                        id="timezone"
                        name="timezone"
                        className="form-control"
                        value={this.state.timezone}
                        onChange={this.onChange} >
                        <option value="" disabled>Choose your Timezone</option>
                        {_map(timezones, (val, key) => (
                            <option key={key} value={val}>{key}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
        );
    }
};

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;