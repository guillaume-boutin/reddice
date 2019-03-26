import { Component } from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions';

class Signup extends Component {
    render () {
        const { userSignupRequest } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm userSignupRequest={userSignupRequest} />
                </div>
            </div>
        );
    }
};

Signup.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {};
    },
    { userSignupRequest }
)(Signup);

// export default Signup;