import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import FormItem from 'components/FormItem/FormItem';

const FormInput = ({ disabled, extraProps, label, name, placeholder, requiredErrorMessage, extraRules }) => {
  return (
    <FormItem extraRules={extraRules} name={name} label={label} requiredErrorMessage={requiredErrorMessage}>
      <Input disabled={disabled} placeholder={placeholder} {...extraProps} />
    </FormItem>
  );
};

FormInput.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  defaultValue: PropTypes.any,
  extraRules: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  requiredErrorMessage: PropTypes.string
};

FormInput.defaultProps = {
  extraProps: {},
  requiredErrorMessage: ''
};

export default FormInput;
