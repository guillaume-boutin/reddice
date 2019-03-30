import { Component } from 'react';
import PropTypes from 'prop-types';
import timezones from '../data/timezones';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

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
            timezone: '',
            errors: {},
            isSubmitting: false
        };
    }

    bindMethods () {
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange (e) {
        let { errors } = this.state;
        delete errors[e.target.name];

        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }

    onSubmit (e) {
        e.preventDefault();

        this.setState({isSubmitting: true});

        this.props
            .userSignupRequest(this.state)
            .then(this.onSubmitSuccess.bind(this))
            .catch(this.onSubmitFail.bind(this))
            .finally(() => { this.setState({isSubmitting: false}) });
    }

    onSubmitSuccess (response) {

    }

    onSubmitFail (error) {
        this.setState({errors: error.response.data.errors});
    }

    errorHelpBlock (messages) {
        return messages && <span className="help-block">
            {messages.map((message) => { return message; }).join(<br/>)}
        </span>
    }

    render () {
        let { errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                <div className={classnames("form-group", {'has-error': errors.username})}>
                    <label htmlFor="username" className="control-label">Username</label>

                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        onChange={this.onChange} />

                    {this.errorHelpBlock(errors.username)}
                </div>

                <div className={classnames("form-group", {'has-error': errors.email})}>
                    <label htmlFor="email" className="control-label">Email</label>

                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={this.onChange} />

                    {this.errorHelpBlock(errors.email)}
                </div>

                <div className={classnames("form-group", {'has-error': errors.password})}>
                    <label htmlFor="password" className="control-label">Password</label>

                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={this.onChange} />

                    {this.errorHelpBlock(errors.password)}
                </div>

                <div className={classnames("form-group", {'has-error': errors.password_confirmation})}>
                    <label htmlFor="password_confirmation" className="control-label">Password Confirmation</label>

                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        className="form-control"
                        onChange={this.onChange} />

                    {this.errorHelpBlock(errors.password_confirmation)}
                </div>

                <div className={classnames("form-group", {'has-error': errors.timezone})}>
                    <label htmlFor="timezone" className="control-label">Timezone</label>

                    <select
                        id="timezone"
                        name="timezone"
                        className="form-control"
                        value={this.state.timezone}
                        onChange={this.onChange}>
                        <option value="" disabled>Choose your Timezone</option>
                        {_map(timezones, (val, key) => (
                            <option key={key} value={val}>{key}</option>
                        ))}
                    </select>

                    {this.errorHelpBlock(errors.timezone)}
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={! _isEmpty(errors) || this.state.isSubmitting}>Sign Up</button>
                </div>
            </form>
        );
    }
};

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;