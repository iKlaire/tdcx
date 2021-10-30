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
  extraProps: PropTypes.object
};

FormInput.defaultProps = {
  extraProps: {}
};

export default FormInput;
