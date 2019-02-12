import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ text }) => (
    <span style={{ color: "red" }}>{text}</span>
);

FormError.propTypes = {
    text: PropTypes.string.isRequired
};


export default FormError;