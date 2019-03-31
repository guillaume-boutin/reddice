import PropTypes from 'prop-types';

const ErrorsHelpBlock = (props) => {
    let errors = props.errors || [];
    if (!errors.length) {
        return null;
    }

    return <span className="help-block">
        {errors.map((error) => { return error; }).join(<br/>)}
    </span>
}

ErrorsHelpBlock.propTypes = {
    errors: PropTypes.array
}

export default ErrorsHelpBlock;