import { Component } from 'react';
import PropTypes from 'prop-types';
import _pick from 'lodash/pick'
import classnames from 'classnames';
import ErrorsHelpBlock from './ErrorsHelpBlock';

class TextFieldGroup extends Component {
    constructor (props) {
        super (props);
    }
    
    render () {
        let { type, label, field, value, onChange, errors } = this.props;
        return (
            <div className={classnames("form-group", {'has-error': errors})}>
                <label htmlFor={field} className="control-label">{label}</label>

                <input
                    type={type}
                    name={field}
                    id={field}
                    className="form-control"
                    value={value}
                    onChange={onChange} />

                <ErrorsHelpBlock errors={errors} />
            </div>
        );
    }
};

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;