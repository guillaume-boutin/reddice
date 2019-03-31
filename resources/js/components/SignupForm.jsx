import { Component } from 'react';
import PropTypes from 'prop-types';
import timezones from '../data/timezones';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import TextFiedGroup from './common/TextFieldGroup';
import ErrorsHelpBlock from './common/ErrorsHelpBlock';

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

    render () {
        let { errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                <TextFiedGroup
                    type="text"
                    field="username"
                    label="Username"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChange}
                    errors={errors.username} />

                <TextFiedGroup
                    type="text"
                    field="email"
                    label="Email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChange}
                    errors={errors.email} />

                <TextFiedGroup
                    type="text"
                    field="password"
                    label="Password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChange}
                    errors={errors.password} />

                <TextFiedGroup
                    type="text"
                    field="password_confirmation"
                    label="Password Confirmation"
                    className="form-control"
                    value={this.state.password_confirmation}
                    onChange={this.onChange}
                    errors={errors.password_confirmation} />

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

                    <ErrorsHelpBlock errors={errors.timezone} />
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